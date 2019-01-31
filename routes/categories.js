const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Route for adding categories into db, don;t use, it is for testing
router.get("/add-categories", (req, res) => {
  const categories = new Category({
    women: {
      categoryName: "women",
      clothing: {
        categoryName: "clothing",
        subcategories: [
          {
            name: "outfits",
            url: "/outfits"
          },
          {
            name: "tops",
            url: "/tops"
          },
          {
            name: "dresses",
            url: "/dresses"
          },
          {
            name: "pants",
            url: "/pants"
          },
          {
            name: "jackets",
            url: "/jackets"
          }
        ]
      },
      shoes: "shoes",
      accessories: {
        categoryName: "accessories",
        subcategories: [
          {
            name: "hats",
            url: "/hats"
          },
          {
            name: "wallets",
            url: "/wallets"
          },
          {
            name: "belts",
            url: "/belts"
          }
        ]
      }
    },
    men: {
      categoryName: "men",
      clothing: {
        categoryName: "clothing",
        subcategories: [
          {
            name: "shirts",
            url: "/shirts"
          },
          {
            name: "pants",
            url: "/pants"
          },
          {
            name: "suits",
            url: "/suits"
          },
          {
            name: "sport",
            url: "/sport"
          }
        ]
      },
      shoes: "shoes",
      accessories: {
        categoryName: "accessories",
        subcategories: [
          {
            name: "clocks",
            url: "/clocks"
          },
          {
            name: "wallets",
            url: "/wallets"
          },
          {
            name: "belts",
            url: "/belts"
          }
        ]
      }
    }
  });

  // Add new user to mongodb
  categories
    .save()
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

module.exports = router;
