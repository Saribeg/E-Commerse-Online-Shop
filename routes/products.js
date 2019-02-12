const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

// Router for adding products into mongodb
router.post("/products/add-products", (req, res) => {
  const newProduct = {};
  newProduct.itemNo = rand();
  newProduct.category = req.body.category;
  newProduct.subCategory = req.body.subCategory;
  if (req.body.furtherSubCategory)
    newProduct.furtherSubCategory = req.body.furtherSubCategory;
  newProduct.model = req.body.model;
  newProduct.currentPrice = Number(req.body.currentPrice);
  if (req.body.previousPrice)
    newProduct.previousPrice = Number(req.body.previousPrice);
  newProduct.productUrl = `/${newProduct.category}/${newProduct.subCategory}/${
    newProduct.furtherSubCategory
  }/${newProduct.itemNo}`;

  newProduct.productFeatures = JSON.parse(req.body.productFeatures);
  newProduct.imageUrls = JSON.parse(req.body.imageUrls);

  const dbProduct = new Product(newProduct);

  dbProduct
    .save()
    .then(newProduct => res.json(newProduct))
    .catch(err => console.log(err));
});

// Make a GET request for url "/products" to get information about all products
router.get("/products", (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => console.log(err));
});

// Make a GET request for url "/products/:category", where :category = women / men, to get information about all products for women / men
router.get("/products/:category", (req, res) => {
  Product.find({ category: req.params.category })
    .then(products => res.json(products))
    .catch(err => console.log(err));
});

// Make a GET request for url "/products/:category/:subCategory", where :category = women / men and :subCategory = clothing/shoes/accessories, to get information about all relevant products
router.get("/products/:category/:subCategory", (req, res) => {
  Product.find({
    category: req.params.category,
    subCategory: req.params.subCategory
  })
    .then(products => res.json(products))
    .catch(err => console.log(err));
});

// Make a GET request for url "/products/:category/:subCategory/:furtherSubCategory", where :category = women / men and :subCategory = clothing/shoes/accessories and :furtherSubCategory = dresses / clocks and other relevent to chosen subCategory, to get information about all relevant products
router.get(
  "/products/:category/:subCategory/:furtherSubCategory",
  (req, res) => {
    Product.find({
      category: req.params.category,
      subCategory: req.params.subCategory,
      furtherSubCategory: req.params.furtherSubCategory
    })
      .then(products => res.json(products))
      .catch(err => console.log(err));
  }
);

// Make a GET request for url "/products/:category/:subCategory/:furtherSubCategory/:id" to get information about the interested product
router.get(
  "/products/:category/:subCategory/:furtherSubCategory/:id",
  (req, res) => {
    Product.find({
      category: req.params.category,
      subCategory: req.params.subCategory,
      furtherSubCategory: req.params.furtherSubCategory,
      id: req.params.id
    })
      .then(products => res.json(products))
      .catch(err => console.log(err));
  }
);

module.exports = router;
