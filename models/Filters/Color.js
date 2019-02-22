const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
  cssHexCode: {
    type: String,
    required: true
  },
  colorName: {
    type: String,
    required: true
  },
  categories: [String],
  sizes: [String],
  prices: {
    min: {
      type: Number
    },
    max: {
      type: Number
    }
  }
});

module.exports = Color = mongoose.model("colors", ColorSchema);
