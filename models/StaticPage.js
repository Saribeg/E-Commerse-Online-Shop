const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaticPageSchema = new Schema({
  title: {
    type: String
  },
  content: [
    {
      title: {
        type: String
      }, 
      content: {
        type: String
      }
    }
  ]
});

module.exports = StaticPage = mongoose.model("static-pages-content", StaticPageSchema);
