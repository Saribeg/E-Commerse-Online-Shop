const express = require("express");
const router = express.Router();
const CategoriesCarousel = require("../models/CategoryCarousel");

router.post("/categoryCarousel/add-categoryItem", (req, res) =>{
    console.log("==========================");
    const categoriesCarouselItems = {};
    categoriesCarouselItems.categoryName = req.body.categoryName;
    categoriesCarouselItems.categoryUrl = req.body.categoryUrl;
    categoriesCarouselItems.categoryImg = req.body.categoryImg;

    new CategoriesCarousel(categoriesCarouselItems)
        .save()
        .then(categoriesCarousel => res.json(categoriesCarousel))
        .catch(err => console.log(err));
})

router.get("/categoryCarousel", (req,res) => {
    CategoriesCarousel.find()
        .then(categoriesCarousel => res.json(categoriesCarousel))
        .catch(err => console.log(err));
})

module.exports = router;