const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NavigationMenuSchema = new Schema({
  collectionName: {
    type: String
  },
  categoryList: [
    {
      categoryName: {
        type: String,
        required: true
      },
      categoryUrl: {
        type: String,
        required: true
      },
      active: {
        type: Boolean,
        required: true,
        default: true
      },
      subCategoryList: [
        {
          subCategoryName: {
            type: String
          },
          subCategoryUrl: {
            type: String
          },
          active: {
            type: Boolean,
            required: true,
            default: true
          },
          furtherSubCategoryList: [
            {
              furtherSubCategoryName: {
                type: String
              },
              furtherSubCategoryUrl: {
                type: String
              },
              active: {
                type: Boolean,
                required: true,
                default: true
              }
            }
          ]
        }
      ]
    }
  ]
});

module.exports = NavigationMenu = mongoose.model(
  "navMenuList",
  NavigationMenuSchema
);
