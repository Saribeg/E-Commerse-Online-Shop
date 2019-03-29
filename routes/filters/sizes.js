const express = require("express");
const router = express.Router();
const Size = require("../../models/Filters/Size");
const Product = require("../../models/Product");
const getUniqArrItems = require("../../utils/utils");

router.post("/filters/sizes/add-size", async (req, res) => {
  let sizeId = req.body.sizeId;

  const newSize = {};
  newSize.value = req.body.value;
  if (req.body.sizeDesc) newSize.sizeDesc = req.body.sizeDesc;
  newSize.categories = [];
  newSize.colors = [];
  newSize.prices = {};
  let tmpPrices = [];

  //Using async function (req, res) and await mongoose query for writing query results in variable "products"
  //This is array of objects (nested structure) with all products, that have chosen color (req.body.colorName)
  let products = await Product.find({
    "productFeatures.sizes.size": req.body.value
  });

  let nonUniqueCategories = [];
  let nonUniqueColors = [];
  let nonUniquePrices = [];

  //Iterating products array to fill newColor.categories and newColor.prices
  products.forEach(product => {
    if (product.active) {
      product.productFeatures.forEach(feature => {
        feature.sizes.forEach(size => {
          if (size.size === req.body.value && size.quantity > 0) {
            let catInfo = `${product.category}-${
              product.furtherSubCategory
                ? product.subCategory + "-" + product.furtherSubCategory
                : product.subCategory
            }`;
            nonUniqueCategories.push(catInfo);
            nonUniquePrices.push(product.currentPrice);
            nonUniqueColors.push(feature.colorName);
          }
        });
      });
    }
  });

  newSize.categories = getUniqArrItems(nonUniqueCategories);
  tmpPrices = getUniqArrItems(nonUniquePrices);
  newSize.colors = getUniqArrItems(nonUniqueColors);

  if (tmpPrices.length > 0) {
    newSize.prices.min = Math.min(...tmpPrices);
    newSize.prices.max = Math.max(...tmpPrices);
  }

  Size.findOne({ value: req.body.value }).then(size => {
    //if size already exists, then find and update it in db
    if (size) {
      Size.findOneAndUpdate(
        { value: req.body.value },
        { $set: newSize },
        { new: true }
      )
        .then(updatedSize => res.json(updatedSize))
        .catch(err => console.log(err));
    } else {
      //if color does not exist, then add it to db
      new Size(newSize)
        .save()
        .then(newSize => res.json(newSize))
        .catch(err => console.log(err));
    }
  });
});

//Get all sizes
router.get("/filters/sizes", (req, res) => {
  Size.find()
    .then(sizes => res.json(sizes))
    .catch(err => console.log(err));
});

// Route for checking existing sizes in DB (not adding or updating)
router.post("/filters/sizes/check-size", async (req, res) => {
  let size = req.body.newSize;

  Size.findOne({ value: size }).then(size => {
    //if size already exists, then find and update it in db
    if (size) {
      res.send({
        message: true,
        existingSize: size
      });
    } else {
      res.send({
        message: false
      });
    }
  });
});

// Route for checking existing sizes in DB (not adding or updating)
router.post("/filters/sizes/update-size", async (req, res) => {
  let sizeValue = req.body.newSize;
  let sizeId = req.body.sizeId;

  console.log(sizeValue);
  console.log(sizeId);

  Size.findOne({ $or: [{ value: sizeValue }, { _id: sizeId }] }).then(size => {
    //if size already exists, then find and update it in db
    if (size) {
      Size.findOneAndUpdate(
        { $or: [{ value: sizeValue }, { _id: sizeId }] },
        { $set: { value: sizeValue } },
        { new: true }
      )
        .then(updatedSize => res.json(updatedSize))
        .catch(err => console.log(err));
    }
  });
});

// Route, which checks all products with updating sizes and creates versions of product-objects, which must be in case of updating sizes
router.post("/sizes/get-pre-updated-products", async (req, res) => {
  let previousSizeName = req.body.previousSizeName;
  let newSizeName = req.body.newSizeName;

  Product.find({ "productFeatures.sizes.size": previousSizeName }).then(
    products => {
      if (products.length > 0) {
        let updatedProducts = products.map(product => {
          product.productFeatures.forEach(color => {
            color.sizes.forEach(size => {
              if (size.size === previousSizeName) {
                size.size = newSizeName;
              }
            });
          });

          return product;
        });

        res.send({
          updatedProducts: updatedProducts,
          message: true
        });
      } else {
        res.send({
          message: false
        });
      }
    }
  );
});

// Router for updating sizes in all products, where they are present
router.post("/sizes/update-sizes-in-products", async (req, res) => {
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
