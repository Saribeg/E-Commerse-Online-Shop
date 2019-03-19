const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FooterSchema = new Schema({
   title: {
    type: String
  },
  text: {
    type: String,
  },
});

module.exports = Footer = mongoose.model("footer-links", FooterSchema);
