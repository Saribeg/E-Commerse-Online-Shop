const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartUnregisteredSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    orderNo: {
        type: String,
        default: '',
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
            availableAmount: {
                type: Number,
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
    date: {
        type: Date,
        default: Date.now
    }

});




module.exports = CartUnregistered = mongoose.model("carts-unregistered", CartUnregisteredSchema);
