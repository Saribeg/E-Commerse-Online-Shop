const express = require("express");
const router = express.Router();
const Size = require("../../models/Filters/Size");
const Product = require("../../models/Product");
const getUniqArrItems = require("../../utils/utils");

router.post("/filters/sizes/add-size", async (req, res) => {
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

module.exports = router;
