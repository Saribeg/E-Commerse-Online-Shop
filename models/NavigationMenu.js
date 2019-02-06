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
      subCategoryList: [
        {
          subCategoryName: {
            type: String
          },
          subCategoryUrl: {
            type: String
          },
          furtherSubCategoryList: [
            {
              furtherSubCategoryName: {
                type: String
              },
              furtherSubCategoryUrl: {
                type: String
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
