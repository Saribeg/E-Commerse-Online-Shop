const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PopularItemsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = PopularItems = mongoose.model("popular-items", PopularItemsSchema);
