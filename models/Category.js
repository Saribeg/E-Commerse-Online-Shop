const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  women: {
    categoryName: {
      type: String
    },
    clothing: {
      categoryName: {
        type: String
      },
      subcategories: [
        {
          url: {
            type: String
          },
          name: {
            type: String
          }
        }
      ]
    },
    shoes: {
      type: String
    },
    accessories: {
      categoryName: {
        type: String
      },
      subcategories: [
        {
          url: {
            type: String
          },
          name: {
            type: String
          }
        }
      ]
    }
  },
  men: {
    categoryName: {
      type: String
    },
    clothing: {
      categoryName: {
        type: String
      },
      subcategories: [
        {
          url: {
            type: String
          },
          name: {
            type: String
          }
        }
      ]
    },
    shoes: {
      type: String
    },
    accessories: {
      categoryName: {
        type: String
      },
      subcategories: [
        {
          url: {
            type: String
          },
          name: {
            type: String
          }
        }
      ]
    }
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Category = mongoose.model("categories", CategorySchema);
