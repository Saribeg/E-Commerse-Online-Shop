import React from "react";
import AdmSizes from "./index";

let isExistingSizesFetching = false;
let existingSizes = [
  {
    prices: {
      min: 63,
      max: 209.99
    },
    categories: ["women-shoes"],
    colors: [
      "black",
      "gray",
      "blue",
      "rose",
      "dark beige",
      "white",
      "red",
      "navy"
    ],
    _id: "5c73fd305adcc004e054d124",
    value: "36",
    __v: 0
  },
  {
    prices: {
      min: 88.3,
      max: 209.99
    },
    categories: ["men-shoes", "women-shoes"],
    colors: ["black", "brown", "dark beige", "rose"],
    _id: "5c73fd405adcc004e054d128",
    value: "40",
    __v: 0
  },
  {
    prices: {
      min: 122.32,
      max: 122.32
    },
    categories: ["men-shoes"],
    colors: ["black"],
    _id: "5c73fd455adcc004e054d129",
    value: "41",
    __v: 0
  },
  {
    prices: {
      min: 122.32,
      max: 122.32
    },
    categories: ["men-shoes"],
    colors: ["black"],
    _id: "5c73fd495adcc004e054d12a",
    value: "42",
    __v: 0
  },
  {
    prices: {
      min: 122.32,
      max: 122.32
    },
    categories: ["men-shoes"],
    colors: ["black"],
    _id: "5c73fd4c5adcc004e054d12b",
    value: "43",
    __v: 0
  },
  {
    prices: {
      min: 55,
      max: 55
    },
    categories: ["men-accessories-belts"],
    colors: ["gray", "burgundy"],
    _id: "5c7d1efa558cad33d8f43f4e",
    value: "76 - 81 CM",
    __v: 0
  },
  {
    prices: {
      min: 55,
      max: 55
    },
    categories: ["men-accessories-belts"],
    colors: ["gray", "burgundy", "brown", "navy blue"],
    _id: "5c7d1f0f558cad33d8f43f4f",
    value: "81 - 86 CM",
    __v: 0
  },
  {
    prices: {
      min: 55,
      max: 55
    },
    categories: ["men-accessories-belts"],
    colors: ["gray", "burgundy", "brown", "navy blue"],
    _id: "5c7d1f17558cad33d8f43f50",
    value: "86 - 91 CM",
    __v: 0
  },
  {
    prices: {
      min: 20,
      max: 655.55
    },
    categories: [
      "women-clothing-dresses",
      "women-accessories-hats",
      "men-clothing-suits",
      "men-clothing-pants",
      "women-clothing-jackets",
      "women-clothing-pants",
      "women-clothing-tops",
      "men-clothing-shirts",
      "men-clothing-sport",
      "women-clothing-hoodies"
    ],
    colors: [
      "black",
      "white",
      "dark beige",
      "blue",
      "yellow",
      "blue black",
      "gray",
      "dark gray",
      "navy blue",
      "navy",
      "burgundy",
      "light brown",
      "beige",
      "green",
      "red",
      "rose",
      "light blue",
      "orange",
      "wine"
    ],
    _id: "5c70205129b47b30640a8f73",
    value: "m",
    sizeDesc: "medium",
    __v: 0
  },
  {
    prices: {
      min: 30,
      max: 575
    },
    categories: [
      "women-clothing-dresses",
      "women-clothing-pants",
      "men-clothing-suits",
      "men-clothing-pants",
      "women-clothing-jackets",
      "women-clothing-tops",
      "women-accessories-hats",
      "men-clothing-shirts",
      "men-clothing-sport",
      "women-clothing-hoodies"
    ],
    colors: [
      "black",
      "blue",
      "light blue",
      "rose",
      "yellow",
      "gray",
      "navy blue",
      "dark gray",
      "wine",
      "white",
      "navy",
      "dark beige",
      "burgundy",
      "light brown",
      "blue black",
      "beige",
      "green",
      "red",
      "orange"
    ],
    _id: "5c700f151c7b2913f88b834c",
    value: "xs",
    sizeDesc: "extra small",
    __v: 0
  },
  {
    prices: {
      min: 25.95,
      max: 159.95
    },
    categories: ["men-accessories-belts", "women-accessories-belts"],
    colors: [
      "burgundy",
      "brown",
      "dark beige",
      "black",
      "red",
      "beige",
      "white",
      "rose"
    ],
    _id: "5c7d1f1f558cad33d8f43f51",
    value: "91 - 96 CM",
    __v: 0
  },
  {
    prices: {
      min: 63,
      max: 209.99
    },
    categories: ["women-shoes"],
    colors: [
      "black",
      "gray",
      "dark beige",
      "blue",
      "rose",
      "wine",
      "white",
      "red",
      "navy",
      "navy blue"
    ],
    _id: "5c73fd345adcc004e054d125",
    value: "37",
    __v: 0
  },
  {
    prices: {
      min: 63,
      max: 209.99
    },
    categories: ["women-shoes", "men-shoes"],
    colors: [
      "black",
      "gray",
      "brown",
      "dark beige",
      "wine",
      "white",
      "red",
      "navy",
      "navy blue"
    ],
    _id: "5c73fd385adcc004e054d126",
    value: "38",
    __v: 0
  },
  {
    prices: {
      min: 63,
      max: 209.99
    },
    categories: ["women-shoes", "men-shoes"],
    colors: [
      "gray",
      "black",
      "brown",
      "dark beige",
      "blue",
      "rose",
      "wine",
      "white",
      "red",
      "navy",
      "navy blue"
    ],
    _id: "5c73fd3c5adcc004e054d127",
    value: "39",
    __v: 0
  },
  {
    prices: {
      min: 399.99,
      max: 450
    },
    categories: ["men-accessories-clocks"],
    colors: ["brown", "black"],
    _id: "5c9923bf4f16a51810eb119f",
    value: "Standard",
    __v: 0
  },
  {
    prices: {
      min: 400,
      max: 450
    },
    categories: ["men-accessories-clocks"],
    colors: ["brown", "black"],
    _id: "5c9923db4f16a51810eb11a0",
    value: "Small",
    __v: 0
  },
  {
    prices: {
      min: 399.99,
      max: 450
    },
    categories: ["men-accessories-clocks"],
    colors: ["brown"],
    _id: "5c9923e34f16a51810eb11a1",
    value: "Midsize",
    __v: 0
  },
  {
    prices: {
      min: 400,
      max: 450
    },
    categories: ["men-accessories-clocks"],
    colors: ["brown", "black"],
    _id: "5c9923ec4f16a51810eb11a2",
    value: "XL/Oversize",
    __v: 0
  },
  {
    prices: {
      min: 23,
      max: 70
    },
    categories: [
      "women-accessories-wallets",
      "men-accessories-wallets",
      "kids-girls-toys"
    ],
    colors: [
      "white",
      "black",
      "brown",
      "burgundy",
      "blue",
      "yellow",
      "orange",
      "green",
      "beige",
      "wine",
      "rose",
      "dark beige",
      "red",
      "navy blue",
      "dark gray",
      "violet"
    ],
    _id: "5c9924354f16a51810eb11a3",
    value: "standart",
    __v: 0
  },
  {
    prices: {
      min: 20,
      max: 655.55
    },
    categories: [
      "women-clothing-dresses",
      "women-clothing-pants",
      "men-clothing-suits",
      "men-clothing-pants",
      "women-clothing-jackets",
      "women-clothing-tops",
      "women-accessories-hats",
      "men-clothing-shirts",
      "men-clothing-sport",
      "women-clothing-hoodies"
    ],
    colors: [
      "black",
      "blue",
      "light blue",
      "dark beige",
      "rose",
      "blue black",
      "gray",
      "navy blue",
      "dark gray",
      "wine",
      "white",
      "navy",
      "orange",
      "light brown",
      "beige",
      "green",
      "red",
      "burgundy",
      "yellow"
    ],
    _id: "5c70206129b47b30640a8f74",
    value: "l",
    sizeDesc: "large",
    __v: 0
  },
  {
    prices: {
      min: 20,
      max: 655.55
    },
    categories: [
      "women-clothing-dresses",
      "women-clothing-pants",
      "women-accessories-hats",
      "men-clothing-suits",
      "men-clothing-pants",
      "women-clothing-jackets",
      "women-clothing-tops",
      "men-clothing-shirts",
      "men-clothing-sport",
      "women-clothing-hoodies"
    ],
    colors: [
      "black",
      "blue",
      "white",
      "light blue",
      "rose",
      "gray",
      "navy blue",
      "dark gray",
      "wine",
      "navy",
      "orange",
      "burgundy",
      "light brown",
      "blue black",
      "beige",
      "green",
      "dark beige",
      "red",
      "yellow"
    ],
    _id: "5c70203d29b47b30640a8f72",
    value: "s",
    sizeDesc: "small",
    __v: 0
  },
  {
    prices: {
      min: 55,
      max: 655.55
    },
    categories: [
      "women-clothing-dresses",
      "men-clothing-suits",
      "women-clothing-jackets",
      "women-clothing-pants",
      "men-clothing-pants",
      "men-clothing-shirts",
      "men-clothing-sport",
      "women-accessories-hats"
    ],
    colors: [
      "dark beige",
      "blue black",
      "gray",
      "black",
      "white",
      "navy",
      "orange",
      "dark gray",
      "navy blue",
      "blue",
      "green",
      "red",
      "rose",
      "yellow",
      "burgundy",
      "beige"
    ],
    _id: "5c70209d29b47b30640a8f75",
    value: "xl",
    sizeDesc: "extra large",
    __v: 0
  }
];

describe("AdmSizes component", () => {
  it("AdmSizes component render", () => {
    const wrapper = shallow(
      <AdmSizes
        isExistingSizesFetching={isExistingSizesFetching}
        existingSizes={existingSizes}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
