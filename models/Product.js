const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: {
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
      type: String,
      required: true
    }
  ],
  colors: [
    {
      type: String,
      required: true
    }
  ],
  sizes: [
    {
      type: String,
      required: true
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);
