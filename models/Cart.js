const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({

    idUser: {
        type: String,
        required: true
    },
    isFinished: {
        type: Boolean,
        required: true
    },
    arrayProduct: [
        {
            id: {
                type: String,
                required: true
            },
            isAvailable: {
                type: Boolean,
                required: true
            },
            reasonNotAvailable: {
                type: String,
                default: ''
            },
            category: {
                type: String,
                required: true
            },
            subCategory: {
                type: String,
                required: true
            },
            furtherSubCategory: {
                type: String,
                required: true
            },
            model: {
                type: String,
                required: true
            },
            colorName: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            priceFormDB: {
                type: String,
                required: true
            },
            urlPhoto: {
                type: String,
                required: true
            },
        }
    ],

});




module.exports = Cart = mongoose.model("carts", CartSchema);