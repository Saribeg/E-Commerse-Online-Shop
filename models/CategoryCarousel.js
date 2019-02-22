const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryCarouselSchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryUrl: {
        type: String,
        required: true
    },
    categoryImg: {
        type: String,
        required: true
    }

});

module.exports = CategoryCarousel = mongoose.model("categoryCarousels", CategoryCarouselSchema);