const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SizeSchema = new Schema({
  value: {
    type: String,
    required: true
  },
  sizeDesc: {
    type: String
  },
  categories: [String],
  colors: [String],
  prices: {
    min: {
      type: Number
    },
    max: {
      type: Number
    }
  }
});

module.exports = Size = mongoose.model("sizes", SizeSchema);
