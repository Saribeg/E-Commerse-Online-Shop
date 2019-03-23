const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);
const multer = require("multer"); // multer for parsing multipart form data (files)
const fse = require("fs-extra");

// Configurations for multer
const storage = multer.diskStorage({
    // Destination, where files should be stored (image url)
    destination: function (req, file, cb) {
        var newDestination = req.headers.path; // We sen image url in header ("path"), when making axios request
        fse.mkdirsSync(newDestination); // We creating folder in destination, specified in headers "path"
        cb(null, newDestination); // Saving file
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname); // We accept original file-name
    }
});

const fileFilter = (req, file, cb) => {
    // Accept file (only jpeg/jpg/png)
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        // reject file (if not jpeg/jpg/png)
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3 // Max size 5MB
    },
    fileFilter: fileFilter
});

// Router for adding products into mongodb from admin panel
router.post("/products/admin-panel/add-products", (req, res) => {
    let newProduct = {};
    newProduct.withdrawnFromSale = req.body.withdrawnFromSale;
    newProduct.active = req.body.active;
    newProduct.itemNo = req.body.itemNo;
    newProduct.category = req.body.category;
    newProduct.subCategory = req.body.subCategory;
    if (req.body.furtherSubCategory)
        newProduct.furtherSubCategory = req.body.furtherSubCategory;
    newProduct.model = req.body.model
        .toLowerCase()
        .trim()
        .replace(/\s\s+/g, " ");
    newProduct.currentPrice = Number(req.body.currentPrice);
    if (req.body.previousPrice)
        newProduct.previousPrice = Number(req.body.previousPrice);

    newProduct.productUrl = `/${newProduct.category}/${newProduct.subCategory}/${
        newProduct.furtherSubCategory
            ? newProduct.furtherSubCategory + "/" + newProduct.itemNo
            : newProduct.itemNo
        }`;

    let imageUrlStaticPart = `/img/products/${
        newProduct.furtherSubCategory
            ? newProduct.category +
            "/" +
            newProduct.subCategory +
            "/" +
            newProduct.furtherSubCategory
            : newProduct.subCategory
            ? newProduct.category + "/" + newProduct.subCategory
            : newProduct.category
        }/${newProduct.itemNo}`;

    let incomingProductFeatures = req.body.productFeatures;
    let productFeatures = incomingProductFeatures.map(color => {
        let imageUrls = color.previewImages.map(img => {
            return `${imageUrlStaticPart}/${color.color.slice(1)}/${img.name}`;
        });

        let sizes = color.sizes.map(size => {
            return {
                size: size.size.value,
                quantity: size.quantity
            };
        });

        return {
            color: color.color,
            colorName: color.colorName.value,
            imageUrls: imageUrls,
            sizes: sizes
        };
    });

    newProduct.productFeatures = JSON.parse(JSON.stringify(productFeatures));

    // Add new product to db
    const dbProduct = new Product(newProduct);

    Product.findOne({
        $or: [{itemNo: req.body.itemNo}, {model: newProduct.model}]
    }).then(product => {
        if (product) {
            res.json({
                newProduct: newProduct,
                message:
                    "Product with sent itemNo (productId) or model name is already exists! itemNo and model name should be unique",
                success: false
            });
        } else {
            dbProduct
                .save()
                .then(newProduct =>
                    res.json({
                        newProduct: newProduct,
                        message: "Produc is saved in DB successfully",
                        success: true
                    })
                )
                .catch(err =>
                    res.json({
                        error: err,
                        message: "Something wrong with saving product in DB. Check DB.",
                        success: false
                    })
                );
        }
    });
});

// Router for saving images in destination folder, spesified above in multer configurations
router.post(
    "/products/admin-panel/upload-product-images",
    upload.array("photos"),
    (req, res) => {
        if (req.files.length > 0) {
            res.json({
                message: "Photos are received"
            });
        } else {
            res.json({
                message:
                    "Something wrong with receiving photos at server. Please, check the path folder"
            });
        }
    }
);

// Router for adding products into mongodb from postman
router.post("/products/add-products", (req, res) => {
    // Our object for adding product to mongo
    const newProduct = {};
    // Generate our product's itemNo with module uniqueRandom
    newProduct.itemNo = rand();
    // Add a category / subCategory / furtherSubCategory (if exists) to which the product belongs, to form a URL
    newProduct.category = req.body.category;
    newProduct.subCategory = req.body.subCategory;
    if (req.body.furtherSubCategory)
        newProduct.furtherSubCategory = req.body.furtherSubCategory;
    // Product description / model name
    newProduct.model = req.body.model
        .toLowerCase()
        .trim()
        .replace(/\s\s+/g, " ");
    // The actual price
    newProduct.currentPrice = Number(req.body.currentPrice);
    // Previous price if there is a promotion.This price should be faded and crossed as not actual
    if (req.body.previousPrice)
        newProduct.previousPrice = Number(req.body.previousPrice);
    // Generating user friendly url using category / subCategory / furtherSubCategory (if exists)
    newProduct.productUrl = `/${newProduct.category}/${newProduct.subCategory}/${
        newProduct.furtherSubCategory
            ? newProduct.furtherSubCategory + "/" + newProduct.itemNo
            : newProduct.itemNo
        }`;
    /*
  An array of objects with several levels of nesting containing the following information:
  1. Color code for css-style and color name.
  2. Array of image urls for this color.
  3. Available sizes for this color.
  4. Available quantity for this color and this size.
  */
    newProduct.productFeatures = JSON.parse(req.body.productFeatures);

    // Add new product to db
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
    Product.find({category: req.params.category})
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
    "/products/:category/:subCategory/:furtherSubCategory?/:id",
    (req, res) => {
        Product.find({
            itemNo: req.params.id
        })
            .then(products => res.json(products))
            .catch(err => console.log(err));
    }
);

//Get filtered products
router.post("/products/filtered-products", (req, res) => {
    let category,
        subCategory,
        furtherSubCategory,
        colorName,
        size,
        pageNo,
        minPrice = 0,
        maxPrice = 1000;

    if (req.body.category) category = req.body.category;
    if (req.body.subCategory) subCategory = req.body.subCategory;
    if (req.body.furtherSubCategory)
        furtherSubCategory = req.body.furtherSubCategory;
    if (req.body.colorName) colorName = req.body.colorName;
    if (req.body.size) size = req.body.size;
    if (req.body.minPrice) minPrice = req.body.minPrice;
    if (req.body.maxPrice) maxPrice = req.body.maxPrice;
    if (req.body.pageNo) pageNo = req.body.pageNo;

    let filters = {
        category,
        subCategory,
        furtherSubCategory,
        "productFeatures.colorName": colorName,
        "productFeatures.sizes.size": size,
        currentPrice: {$gt: minPrice, $lt: maxPrice}
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

    let perPage = 5;


    Product.find(filter(filters))
        .skip((perPage * pageNo) - perPage)
        .limit(perPage)
        .then(products => {
            Product
                .find(filter(filters))
                .count()
                .then(amount => {

                    // console.log(amount);
                    res.json({
                        products: products,
                        amount: amount / perPage,
                    })
                })



        })
        .catch(err => console.log(err));
});

module.exports = router;
