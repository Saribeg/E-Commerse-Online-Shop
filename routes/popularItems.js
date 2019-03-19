const express = require("express");
const router = express.Router();
const PopularItems = require("../models/PopularItems");
const Product = require("../models/Product");

// Route for adding new items to PopularItems
router.post("/popular-items/add-items", (req, res) => {
    const newPopularItem = {};
    newPopularItem.product = req.body.productId;

    new PopularItems(newPopularItem)
        .save()
        .then(PopularItem => res.json(PopularItem))
        .catch(err => console.log(err));
});

// Route for getting all items from PopularItems
router.get("/popular-items", (req, res) => {
    PopularItems.find()
        .populate("product")
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

// Route for delete items from PopularItems
router.post("/popular-items/delete-item/:id", (req, res) => {
    PopularItems.deleteOne({'product': req.params.id})
        .then(items => res.json(items))
        .catch(err => console.log(err));
});

module.exports = router;
