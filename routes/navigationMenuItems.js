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
          { $set: navigationMenuItems },
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

  // Don't touch thw code below, it is for testing
  //============================================================
  // const navigationMenuItems = {};
  // navigationMenuItems.collectionName = "navMenuList";
  // navigationMenuItems.categoryList = [];
  // const newCategory = {};
  // newCategory.categoryName = req.body.categoryName;
  // newCategory.categoryUrl = `/${newCategory.categoryName}`;
  // newCategory.subCategoryList = [];
  // const newSubCategory = {};
  // newSubCategory.subCategoryName = req.body.subCategoryName;
  // newSubCategory.subCategoryUrl = `${newCategory.categoryUrl}/${
  //   newSubCategory.subCategoryName
  // }`;
  // newSubCategory.furtherSubCategoryList = [];
  // let newfurtherSubCategory = {};
  // newfurtherSubCategory.furtherSubCategoryName =
  //   req.body.furtherSubCategoryName;
  // newfurtherSubCategory.furtherSubCategoryUrl = `${
  //   newSubCategory.subCategoryUrl
  // }/${newfurtherSubCategory.furtherSubCategoryName}`;
  // if (req.body.furtherSubCategoryName)
  //   newSubCategory.furtherSubCategoryList.push(newfurtherSubCategory);
  // newCategory.subCategoryList.push(newSubCategory);
  // navigationMenuItems.categoryList.push(newCategory);
  // NavigationMenu.findOne({ collectionName: "navMenuList" }).then(
  //   navMenuList => {
  //     // If the collection with our navmenu items already exists then modify information in DB
  //     if (navMenuList) {
  //       if (
  //         navMenuList.categoryList.some(
  //           e => e.categoryName !== req.body.categoryName
  //         )
  //       ) {
  //         if (req.body.categoryName) {
  //           navMenuList.categoryList.push(newCategory);
  //         }
  //       }
  //       if (!req.body.categoryName) {
  //         res.json({
  //           msg: `For adding Sub Category you have to choose Category first`
  //         });
  //       } else if (
  //         navMenuList.categoryList[0].subCategoryList.some(
  //           e => e.subCategoryName !== req.body.subCategoryName
  //         )
  //       ) {
  //         if (req.body.subCategoryName) {
  //           navMenuList.categoryList[0].subCategoryList.push(newSubCategory);
  //         }
  //       }
  //       if (
  //         (!req.body.categoryName && !req.body.subCategoryName) ||
  //         (!req.body.categoryName && req.body.subCategoryName) ||
  //         (!req.body.subCategoryName && req.body.furtherSubCategoryName)
  //       ) {
  //         res.json({
  //           msg: `For adding Further Sub Category you have to choose Category and Sub Category first`
  //         });
  //       } else if (
  //         navMenuList.categoryList[0].subCategoryList[0].furtherSubCategoryList.some(
  //           e => e.furtherSubCategoryName !== req.body.furtherSubCategoryName
  //         )
  //       ) {
  //         if (req.body.furtherSubCategoryName) {
  //           navMenuList.categoryList[0].subCategoryList[0].furtherSubCategoryList.push(
  //             newfurtherSubCategory
  //           );
  //         }
  //       }
  //       navMenuList.save().then(navMenuList => res.json(navMenuList));
  //     } else {
  //       new NavigationMenu(navigationMenuItems)
  //         .save()
  //         .then(data => res.json(data))
  //         .catch(err => console.log(err));
  //     }
  //   }
  // );
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

router.get("/", (req, res) => {
  NavigationMenu.find({ collectionName: "navMenuList" })
    .then(navMenuList => res.json(navMenuList))
    .catch(err => console.log(err));
});

module.exports = router;
