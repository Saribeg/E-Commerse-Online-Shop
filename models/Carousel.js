const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarouselSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Carousel = mongoose.model("carousel", CarouselSchema);
