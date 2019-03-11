const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const CategoryCarousels = require("../models/CategoryCarousel");

router.post("/search/search-products", async (req, res) => {
  //Taking the entered value from client in lower-case and trimed
  let query = req.body.query
    .toLowerCase()
    .trim()
    .replace(/\s\s+/g, " ");

  console.log(query);

  // Creating the array of key-words from taken string
  let queryArr = query.split(" ");

  // Finding ALL products, that have at least one match
  let matchedProducts = await Product.find({
    $or: [
      { category: { $in: queryArr } },
      { subCategory: { $in: queryArr } },
      { furtherSubCategory: { $in: queryArr } },
      { model: { $in: queryArr } },
      { itemNo: { $in: queryArr } },
      { "productFeatures.colorName": { $in: queryArr } },
      { "productFeatures.sizes.size": { $in: queryArr } }
    ]
  });

  // Function for detecting matches of which the products was finded
  findMatchesKeys = (matches = {}, iterationArr, arrOfProducts) => {
    // Creating arrays to push all word matches
    let categoryArr = [];
    let subCategoryArr = [];
    let furtherSubCategoryArr = [];
    let modelArr = [];
    let itemNoArr = [];
    let colorNameArr = [];
    let sizeArr = [];

    //Filling arrays with matches comparing the value, taken from client, with product info
    fillObjectOfMatchesKeys = (arrOfProducts, value) => {
      arrOfProducts.forEach(product => {
        if (!product.withdrawnFromSale && product.active) {
          product.productFeatures.forEach(color => {
            color.sizes.forEach(size => {
              if (value === size.size && size.quantity > 0) {
                sizeArr.push(size.size);
                matches.size = [...new Set(sizeArr)];
              }
            });
            if (color.colorName.includes(value)) {
              colorNameArr.push(color.colorName);
              matches.colorName = [...new Set(colorNameArr)];
            }
          });
          if (value === product.category) {
            categoryArr.push(product.category);
            matches.category = [...new Set(categoryArr)];
          }
          if (value === product.subCategory) {
            subCategoryArr.push(product.subCategory);
            matches.subCategory = [...new Set(subCategoryArr)];
          }
          if (value === product.furtherSubCategory) {
            furtherSubCategoryArr.push(product.furtherSubCategory);
            matches.furtherSubCategory = [...new Set(furtherSubCategoryArr)];
          }
          if (value === product.itemNo) {
            itemNoArr.push(product.itemNo);
            matches.itemNo = [...new Set(itemNoArr)];
          }

          let modelWords = product.model
            .toLowerCase()
            .trim()
            .replace(/\s\s+/g, " ")
            .split(" ");

          modelWords.forEach(word => {
            if (value === word) {
              modelArr.push(product.model);
              matches.model = [...new Set(modelArr)];
            }
          });
        }
      });
    };

    // Function call with different word-params to compare and fill arrays of matches
    for (let i = 0; i < iterationArr.length; i++) {
      fillObjectOfMatchesKeys(arrOfProducts, iterationArr[i]);
    }

    return matches;
  };

  findMatchesKeys((matches = {}), queryArr, matchedProducts);

  //Function for filtering products to send to client
  filterTheProducts = async () => {
    let category,
      subCategory,
      furtherSubCategory,
      model,
      itemNo,
      colorName,
      size;

    if (matches.category) category = matches.category;
    if (matches.subCategory) subCategory = matches.subCategory;
    if (matches.furtherSubCategory)
      furtherSubCategory = matches.furtherSubCategory;
    if (matches.model) model = matches.model;
    if (matches.itemNo) itemNo = matches.itemNo;
    if (matches.colorName) colorName = matches.colorName;
    if (matches.size) size = matches.size;

    let filters = {
      category,
      subCategory,
      furtherSubCategory,
      // model,
      itemNo,
      "productFeatures.colorName": colorName,
      "productFeatures.sizes.size": size
    };

    function filter(data) {
      let query = {};

      for (let key in data) {
        if (data[key] !== undefined) {
          query[key] = data[key];
        }
      }

      return query;
    }

    // Product.find(filter(filters))
    //   .then(products => res.json(products))
    //   .catch(err => console.log(err));

    let productsWithoutModelName = await Product.find(filter(filters));
    let productsWithModelName = await Product.find({ model: { $in: model } });
    let combineArrs = productsWithoutModelName.concat(productsWithModelName);

    function removeDuplicates(arr, prop) {
      let obj = {};
      return Object.keys(
        arr.reduce((prev, next) => {
          if (!obj[next[prop]]) obj[next[prop]] = next;
          return obj;
        }, obj)
      ).map(i => obj[i]);
    }

    res.json(removeDuplicates(combineArrs, "_id"));

    // let result = removeDuplicates(combineArrs, "_id").map(product => {
    //   return {
    //     category: product.category,
    //     subCategory: product.subCategory,
    //     furtherSubCategory: product.furtherSubCategory,
    //     model: product.model,
    //     itemNo: product.itemNo
    //   };
    // });

    // res.json(result);
  };

  filterTheProducts();
});

module.exports = router;
