const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryListSchema = new Schema({
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

module.exports = CategoryList = mongoose.model("categoriesList", CategoryListSchema);