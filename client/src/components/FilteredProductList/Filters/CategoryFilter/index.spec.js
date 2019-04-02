import React from "react";
import CategoryFilter from "./index";

const category = "women";
let navMenuItems = [
  {
    active: true,
    subCategoryList: [
      {
        active: true,
        furtherSubCategoryList: [
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523d02",
            furtherSubCategoryName: "hoodies",
            furtherSubCategoryUrl: "/women/clothing/hoodies"
          },
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523d01",
            furtherSubCategoryName: "tops",
            furtherSubCategoryUrl: "/women/clothing/tops"
          },
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523d00",
            furtherSubCategoryName: "dresses",
            furtherSubCategoryUrl: "/women/clothing/dresses"
          },
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cff",
            furtherSubCategoryName: "pants",
            furtherSubCategoryUrl: "/women/clothing/pants"
          },
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cfe",
            furtherSubCategoryName: "jackets",
            furtherSubCategoryUrl: "/women/clothing/jackets"
          }
        ],
        _id: "5c9a74aaf90e1e13d8523cfd",
        subCategoryName: "clothing",
        subCategoryUrl: "/women/clothing"
      },
      {
        active: true,
        furtherSubCategoryList: [
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cfc",
            furtherSubCategoryName: "hats",
            furtherSubCategoryUrl: "/women/accessories/hats"
          },
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cfb",
            furtherSubCategoryName: "wallets",
            furtherSubCategoryUrl: "/women/accessories/wallets"
          },
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cfa",
            furtherSubCategoryName: "belts",
            furtherSubCategoryUrl: "/women/accessories/belts"
          }
        ],
        _id: "5c9a74aaf90e1e13d8523cf9",
        subCategoryName: "accessories",
        subCategoryUrl: "/women/accessories"
      },
      {
        active: true,
        furtherSubCategoryList: [],
        _id: "5c9a74aaf90e1e13d8523cf8",
        subCategoryName: "shoes",
        subCategoryUrl: "/women/shoes"
      }
    ],
    _id: "5c9a74aaf90e1e13d8523cf7",
    categoryName: "women",
    categoryUrl: "/women"
  },
  {
    active: true,
    subCategoryList: [
      {
        active: true,
        furtherSubCategoryList: [
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cf6",
            furtherSubCategoryName: "shirts",
            furtherSubCategoryUrl: "/men/clothing/shirts"
          },
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cf5",
            furtherSubCategoryName: "pants",
            furtherSubCategoryUrl: "/men/clothing/pants"
          },
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cf4",
            furtherSubCategoryName: "suits",
            furtherSubCategoryUrl: "/men/clothing/suits"
          },
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cf3",
            furtherSubCategoryName: "sport",
            furtherSubCategoryUrl: "/men/clothing/sport"
          }
        ],
        _id: "5c9a74aaf90e1e13d8523cf2",
        subCategoryName: "clothing",
        subCategoryUrl: "/men/clothing"
      },
      {
        active: true,
        furtherSubCategoryList: [
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cf1",
            furtherSubCategoryName: "clocks",
            furtherSubCategoryUrl: "/men/accessories/clocks"
          },
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cf0",
            furtherSubCategoryName: "wallets",
            furtherSubCategoryUrl: "/men/accessories/wallets"
          },
          {
            active: true,
            _id: "5c9a74aaf90e1e13d8523cef",
            furtherSubCategoryName: "belts",
            furtherSubCategoryUrl: "/men/accessories/belts"
          }
        ],
        _id: "5c9a74aaf90e1e13d8523cee",
        subCategoryName: "accessories",
        subCategoryUrl: "/men/accessories"
      },
      {
        active: true,
        furtherSubCategoryList: [],
        _id: "5c9a74aaf90e1e13d8523ced",
        subCategoryName: "shoes",
        subCategoryUrl: "/men/shoes"
      }
    ],
    _id: "5c9a74aaf90e1e13d8523cec",
    categoryName: "men",
    categoryUrl: "/men"
  }
];

describe("Filter by categories component", () => {
  it("CategoryFilter component render", () => {
    const wrapper = shallow(
      <CategoryFilter category={category} navMenuItems={navMenuItems} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
