const express = require("express");
const router = express.Router();
const Color = require("../../models/Filters/Color");
const Product = require("../../models/Product");
const getUniqArrItems = require("../../utils/utils");

// Route for adding new or updating existing colors in DB
router.post("/filters/colors/add-color", async (req, res) => {
  // Our color object
  const newColor = {};
  newColor.cssHexCode = req.body.cssHexCode;
  newColor.colorName = req.body.colorName
    .toLowerCase()
    .trim()
    .replace(/\s\s+/g, " ");
  newColor.categories = [];
  newColor.sizes = [];
  let tmpPrices = []; // Temporary array of prices for getting min / max for colors collection
  newColor.prices = {};

  //Using async function (req, res) and await mongoose query for writing query results in variable "products"
  //This is array of objects (nested structure) with all products, that have chosen color (req.body.colorName)
  let products = await Product.find({
    "productFeatures.colorName": req.body.colorName
  });

  let nonUniqueCategories = [];
  let nonUniqueSizes = [];
  let nonUniquePrices = [];

  products.forEach(product => {
    if (product.active) {
      product.productFeatures.forEach(feature => {
        if (feature.colorName === req.body.colorName) {
          feature.sizes.forEach(size => {
            if (size.quantity > 0) {
              let catInfo = `${product.category}-${
                product.furtherSubCategory
                  ? product.subCategory + "-" + product.furtherSubCategory
                  : product.subCategory
              }`;
              nonUniqueCategories.push(catInfo);
              nonUniquePrices.push(product.currentPrice);
              nonUniqueSizes.push(size.size);
            }
          });
        }
      });
    }
  });

  newColor.categories = getUniqArrItems(nonUniqueCategories);
  tmpPrices = getUniqArrItems(nonUniquePrices);
  newColor.sizes = getUniqArrItems(nonUniqueSizes);

  if (tmpPrices.length > 0) {
    newColor.prices.min = Math.min(...tmpPrices);
    newColor.prices.max = Math.max(...tmpPrices);
  }

  Color.findOne({
    $or: [
      { colorName: newColor.colorName },
      { cssHexCode: newColor.cssHexCode }
    ]
  }).then(color => {
    //if color already exists, then find and update it in db
    if (color) {
      Color.findOneAndUpdate(
        {
          $or: [
            { colorName: newColor.colorName },
            { cssHexCode: newColor.cssHexCode }
          ]
        },
        { $set: newColor },
        { new: true }
      )
        .then(updatedColor => res.json(updatedColor))
        .catch(err => console.log(err));
    } else {
      //if color does not exist, then add it to db
      new Color(newColor)
        .save()
        .then(newColor => res.json(newColor))
        .catch(err => console.log(err));
    }
  });
});

// Route for checking existing color in DB (not adding or updating)
router.post("/filters/colors/check-color", async (req, res) => {
  // Our color object
  const newColor = {};
  newColor.cssHexCode = req.body.cssHexCode;
  newColor.colorName = req.body.colorName;

  Color.find({
    $or: [
      { colorName: req.body.colorName },
      { cssHexCode: req.body.cssHexCode }
    ]
  }).then(color => {
    //if color already exists
    if (color.length > 0) {
      res.send({
        message: true,
        existingColor: color
      });
    } else {
      res.send({
        message: false,
        existingColor: color
      });
    }
  });
});

//Get all colors
router.get("/filters/colors", (req, res) => {
  Color.find()
    .then(colors => res.json(colors))
    .catch(err => console.log(err));
});

// Route, which checks all products with updating colors and creates versions of product-objects, which must be in case of updating products
router.post("/colors/get-pre-updated-products", async (req, res) => {
  let nameOfColor = req.body.colorName
    .toLowerCase()
    .trim()
    .replace(/\s\s+/g, " ");
  let hex = req.body.cssHexCode;

  Product.find({
    $or: [
      { "productFeatures.colorName": nameOfColor },
      { "productFeatures.color": hex }
    ]
  }).then(products => {
    if (products.length > 0) {
      let updatedProducts = products.map(product => {
        product.productFeatures.forEach(color => {
          if (color.colorName === nameOfColor || color.color === hex) {
            color.colorName = nameOfColor;
            color.color = hex;
          }
        });

        return product;
      });

      res.send({
        updatedProducts: updatedProducts,
        message: true
      });
    } else {
      res.send({ message: false });
    }
  });
});

// Router for updating colors in all products, where they are present
router.post("/colors/update-colors-in-products", async (req, res) => {
  let product = req.body.product;

  Product.findOneAndUpdate(
    { _id: product._id },
    { $set: product },
    { new: true }
  )
    .then(updatedProduct => {
      res.send(updatedProduct);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
