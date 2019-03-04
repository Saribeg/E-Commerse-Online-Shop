const express = require("express");
const router = express.Router();
const Carousel = require("../models/Carousel");
const Product = require("../models/Product");

// Route for adding new items to Carousel
router.post("/carousel/add-items", (req, res) => {
  const newCarouselItem = {};
  newCarouselItem.product = req.body.productId;
  newCarouselItem.imageUrl = req.body.imageUrl;

  new Carousel(newCarouselItem)
    .save()
    .then(CarouselItem => res.json(CarouselItem))
    .catch(err => console.log(err));
});

// Route for getting all items from Carousel
router.get("/carousel", (req, res) => {
  Carousel.find()
    .populate("product", [
      "model",
      "currentPrice",
      "productUrl"
    ])
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

module.exports = router;
