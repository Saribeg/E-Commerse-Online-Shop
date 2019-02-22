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
  newColor.colorName = req.body.colorName;
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

  Color.findOne({ colorName: req.body.colorName }).then(color => {
    //if color already exists, then find and update it in db
    if (color) {
      Color.findOneAndUpdate(
        { colorName: req.body.colorName },
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

//Get all colors
router.get("/filters/colors", (req, res) => {
  Color.find()
    .then(colors => res.json(colors))
    .catch(err => console.log(err));
});

module.exports = router;
