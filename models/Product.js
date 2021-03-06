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
  productFeatures: [
    {
      color: {
        type: String,
        required: true,
        default: "unset"
      },
      colorName: {
        type: String,
        required: true,
        default: "unset"
      },
      imageUrls: [
        {
          type: String,
          required: true
        }
      ],
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
    type: Boolean,
    required: true,
    default: false
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

ProductSchema.index({ "$**": "text" });

module.exports = Product = mongoose.model("products", ProductSchema);
