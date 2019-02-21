const express = require("express");
const router = express.Router();
const CategoryCarousels = require("../models/CategoryCarousel");

router.post("/categoryCarousels/add-categoryItem", (req, res) =>{
    const categoriesCarouselItems = {};
    categoriesCarouselItems.categoryName = req.body.categoryName;
    categoriesCarouselItems.categoryUrl = req.body.categoryUrl;
    categoriesCarouselItems.categoryImg = req.body.categoryImg;

    new CategoryCarousels(categoriesCarouselItems)
        .save()
        .then(categoriesCarousel => res.json(categoriesCarousel))
        .catch(err => console.log(err));
})

router.get("/categoryCarousels", (req,res) => {
    CategoryCarousels.find()
        .then(categoriesCarousel => res.json(categoriesCarousel))
        .catch(err => console.log(err));
})

module.exports = router;