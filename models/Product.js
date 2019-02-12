const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  itemNo: {
    type: String,
    required: true
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
    type: String
  },
  model: {
    type: String,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  previousPrice: {
    type: Number
  },
  productUrl: {
    type: String,
    required: true
  },
  imageUrls: [
    {
      urls: [
        {
          type: String,
          required: true
        }
      ],
      color: {
        type: String,
        required: true
      }
    }
  ],
  productFeatures: [
    {
      color: {
        type: String,
        required: true
      },
      sizes: [
        {
          size: {
            type: String,
            required: true
          },
          quantity: {
            type: Number,
            required: true
          }
        }
      ]
    }
  ],
  withdrawnFromSale: {
    type: String,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);
