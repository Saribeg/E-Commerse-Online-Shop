const express = require("express");
const router = express.Router();
const NavigationMenu = require("../models/NavigationMenu");

// Route for adding categories into db, don;t use, it is for testing
router.post("/navigation-menu/add-list", (req, res) => {
  let navigationMenuItems = req.body.navigationMenuItems; // Receive object with nav-menu items from client-side ajax

  NavigationMenu.findOne({ collectionName: "navMenuList" }).then(
    navMenuList => {
      // If the collection with our navmenu items already exists then modify information in DB
      if (navMenuList) {
        NavigationMenu.findOneAndUpdate(
          { collectionName: "navMenuList" },
          { $set: { categoryList: navigationMenuItems } },
          { new: true }
        ).then(navMenuList => res.json(navMenuList));
      } else {
        // If the collection with our navmenu does not exist then create the collection
        new NavigationMenu(navigationMenuItems)
          .save()
          .then(navMenuList => res.json(navMenuList))
          .catch(err => console.log(err));
      }
    }
  );

  //The under code is for creating initial nav-menu collection, don't delete, you can use it with get request
  //============================================================
  //   let navCollection = {
  //     collectionName: "navMenuList",
  //     categoryList: [
  //       {
  //         categoryName: "women",
  //         categoryUrl: "/women",
  //         subCategoryList: [
  //           {
  //             subCategoryName: "clothing",
  //             subCategoryUrl: "/women/clothing",
  //             furtherSubCategoryList: [
  //               {
  //                 furtherSubCategoryName: "outfits",
  //                 furtherSubCategoryUrl: "/women/clothing/outfits"
  //               },
  //               {
  //                 furtherSubCategoryName: "tops",
  //                 furtherSubCategoryUrl: "/women/clothing/tops"
  //               },
  //               {
  //                 furtherSubCategoryName: "dresses",
  //                 furtherSubCategoryUrl: "/women/clothing/dresses"
  //               },
  //               {
  //                 furtherSubCategoryName: "pants",
  //                 furtherSubCategoryUrl: "/women/clothing/pants"
  //               },
  //               {
  //                 furtherSubCategoryName: "jackets",
  //                 furtherSubCategoryUrl: "/women/clothing/jackets"
  //               }
  //             ]
  //           },
  //           {
  //             subCategoryName: "accessories",
  //             subCategoryUrl: "/women/accessories",
  //             furtherSubCategoryList: [
  //               {
  //                 furtherSubCategoryName: "hats",
  //                 furtherSubCategoryUrl: "/women/accessories/hats"
  //               },
  //               {
  //                 furtherSubCategoryName: "wallets",
  //                 furtherSubCategoryUrl: "/women/accessories/wallets"
  //               },
  //               {
  //                 furtherSubCategoryName: "belts",
  //                 furtherSubCategoryUrl: "/women/accessories/belts"
  //               }
  //             ]
  //           },
  //           {
  //             subCategoryName: "shoes",
  //             subCategoryUrl: "/women/shoes"
  //           }
  //         ]
  //       },
  //       {
  //         categoryName: "men",
  //         categoryUrl: "/men",
  //         subCategoryList: [
  //           {
  //             subCategoryName: "clothing",
  //             subCategoryUrl: "/men/clothing",
  //             furtherSubCategoryList: [
  //               {
  //                 furtherSubCategoryName: "shirts",
  //                 furtherSubCategoryUrl: "/men/clothing/shirts"
  //               },
  //               {
  //                 furtherSubCategoryName: "pants",
  //                 furtherSubCategoryUrl: "/men/clothing/pants"
  //               },
  //               {
  //                 furtherSubCategoryName: "suits",
  //                 furtherSubCategoryUrl: "/men/clothing/suits"
  //               },
  //               {
  //                 furtherSubCategoryName: "sport",
  //                 furtherSubCategoryUrl: "/men/clothing/sport"
  //               }
  //             ]
  //           },
  //           {
  //             subCategoryName: "accessories",
  //             subCategoryUrl: "/men/accessories",
  //             furtherSubCategoryList: [
  //               {
  //                 furtherSubCategoryName: "clocks",
  //                 furtherSubCategoryUrl: "/men/accessories/clocks"
  //               },
  //               {
  //                 furtherSubCategoryName: "wallets",
  //                 furtherSubCategoryUrl: "/men/accessories/wallets"
  //               },
  //               {
  //                 furtherSubCategoryName: "belts",
  //                 furtherSubCategoryUrl: "/men/accessories/belts"
  //               }
  //             ]
  //           },
  //           {
  //             subCategoryName: "shoes",
  //             subCategoryUrl: "/men/shoes"
  //           }
  //         ]
  //       }
  //     ]
  //   };

  //   new NavigationMenu(navCollection)
  //     .save()
  //     .then(data => res.json(data))
  //     .catch(err => console.log(err));
});

router.get("/nav-menu", (req, res) => {
  NavigationMenu.find({ collectionName: "navMenuList" })
    .then(navMenuList => res.json(navMenuList))
    .catch(err => console.log(err));
});

module.exports = router;
