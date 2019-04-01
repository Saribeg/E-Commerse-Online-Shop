import React from "react";
import AdmColors from "./index";

let isExistingColorsFetching = false;
let existingColors = [
  {
    categories: [],
    sizes: [],
    _id: "5c73e6e4a898a30db019f315",
    cssHexCode: "#c8d7ed",
    colorName: "light blue",
    __v: 0
  },
  {
    categories: [],
    sizes: [],
    _id: "5c73e709a898a30db019f317",
    cssHexCode: "#e73e81",
    colorName: "wine",
    __v: 0
  },
  {
    categories: [],
    sizes: [],
    _id: "5c73e78da898a30db019f31e",
    cssHexCode: "#304293",
    colorName: "navy",
    __v: 0
  },
  {
    categories: [],
    sizes: [],
    _id: "5c73e7a3a898a30db019f320",
    cssHexCode: "#059a6a",
    colorName: "green",
    __v: 0
  },
  {
    prices: {
      min: 77.8,
      max: 77.8
    },
    categories: ["men-clothing-pants"],
    sizes: ["xs", "s", "m", "l"],
    _id: "5c73e7bda898a30db019f322",
    cssHexCode: "#1d202d",
    colorName: "dark gray",
    __v: 0
  },
  {
    prices: {
      min: 30,
      max: 556.33
    },
    categories: [
      "men-accessories-belts",
      "men-clothing-suits",
      "women-accessories-hats",
      "women-shoes",
      "men-clothing-shirts",
      "kids-boys-pants"
    ],
    sizes: [
      "76 - 81 CM",
      "81 - 86 CM",
      "86 - 91 CM",
      "xs",
      "s",
      "m",
      "l",
      "xl",
      "xxl",
      "35",
      "36",
      "37",
      "38",
      "39",
      "42"
    ],
    _id: "5c73e7e9a898a30db019f325",
    cssHexCode: "#5e5f5c",
    colorName: "gray",
    __v: 0
  },
  {
    prices: {
      min: 55,
      max: 55
    },
    categories: ["men-accessories-belts"],
    sizes: ["81 - 86 CM", "86 - 91 CM", "91 - 96 CM"],
    _id: "5c73e7f6a898a30db019f326",
    cssHexCode: "#63453d",
    colorName: "brown",
    __v: 0
  },
  {
    categories: [],
    sizes: [],
    _id: "5c73e802a898a30db019f327",
    cssHexCode: "#988d71",
    colorName: "light brown",
    __v: 0
  },
  {
    prices: {
      min: 23,
      max: 400
    },
    categories: [
      "women-clothing-dresses",
      "women-shoes",
      "men-shoes",
      "women-clothing-pants",
      "women-accessories-belts",
      "women-accessories-wallets",
      "men-accessories-belts",
      "men-accessories-wallets",
      "men-accessories-clocks",
      "men-clothing-sport",
      "men-clothing-shirts",
      "women-clothing-jackets",
      "women-clothing-hoodies",
      "women-clothing-tops",
      "women-accessories-hats",
      "kids-boys-schoolbags"
    ],
    sizes: [
      "s",
      "xs",
      "m",
      "l",
      "36",
      "37",
      "38",
      "40",
      "41",
      "42",
      "43",
      "xxl",
      "xl",
      "76 - 81 CM",
      "81 - 86 CM",
      "86 - 91 CM",
      "standart",
      "39",
      "91 - 96 CM",
      "Small",
      "Standard",
      "XL/Oversize"
    ],
    _id: "5c73e6b6a898a30db019f314",
    cssHexCode: "#000000",
    colorName: "black",
    __v: 0
  },
  {
    prices: {
      min: 26,
      max: 159.99
    },
    categories: [
      "women-clothing-dresses",
      "women-clothing-jackets",
      "women-clothing-tops",
      "women-accessories-wallets",
      "women-clothing-hoodies",
      "women-accessories-hats"
    ],
    sizes: ["xs", "m", "s", "l", "xl", "standart"],
    _id: "5c73e76da898a30db019f31c",
    cssHexCode: "#faeb48",
    colorName: "yellow",
    __v: 0
  },
  {
    categories: [],
    sizes: [],
    _id: "5c73e6fba898a30db019f316",
    cssHexCode: "#f7bce0",
    colorName: "light rose",
    __v: 0
  },
  {
    prices: {
      min: 26.95,
      max: 209.99
    },
    categories: [
      "women-clothing-dresses",
      "women-clothing-jackets",
      "women-clothing-hoodies",
      "women-clothing-pants",
      "women-clothing-tops",
      "women-accessories-belts",
      "women-accessories-wallets",
      "women-accessories-hats",
      "women-shoes",
      "kids-girls-toys"
    ],
    sizes: [
      "s",
      "xs",
      "l",
      "m",
      "xl",
      "76 - 81 CM",
      "81 - 86 CM",
      "86 - 91 CM",
      "91 - 96 CM",
      "standart",
      "36",
      "37",
      "39",
      "40"
    ],
    _id: "5c73e79ba898a30db019f31f",
    cssHexCode: "#f18ccb",
    colorName: "rose",
    __v: 0
  },
  {
    categories: [],
    sizes: [],
    _id: "5c9a2b3f613c0c04483cc4a5",
    cssHexCode: "#ffa500",
    colorName: "orange",
    __v: 0
  },
  {
    prices: {
      min: 28.32,
      max: 575
    },
    categories: [
      "men-clothing-suits",
      "men-clothing-sport",
      "kids-boys-schoolbags"
    ],
    sizes: ["m", "l", "xl", "xs", "s", "xxl"],
    _id: "5c73e7b0a898a30db019f321",
    cssHexCode: "#1f2535",
    colorName: "blue black",
    __v: 0
  },
  {
    prices: {
      min: 26.95,
      max: 209.99
    },
    categories: [
      "women-clothing-dresses",
      "women-clothing-pants",
      "women-accessories-belts",
      "men-clothing-shirts",
      "women-shoes",
      "women-clothing-tops",
      "women-accessories-wallets"
    ],
    sizes: [
      "m",
      "l",
      "xl",
      "xs",
      "76 - 81 CM",
      "81 - 86 CM",
      "86 - 91 CM",
      "91 - 96 CM",
      "s",
      "xxl",
      "37",
      "38",
      "39",
      "40",
      "standart",
      "36"
    ],
    _id: "5c73e7dca898a30db019f324",
    cssHexCode: "#ddb38d",
    colorName: "dark beige",
    __v: 0
  },
  {
    prices: {
      min: 28.32,
      max: 209.99
    },
    categories: [
      "women-clothing-pants",
      "women-clothing-dresses",
      "men-clothing-shirts",
      "women-clothing-jackets",
      "women-clothing-tops",
      "women-accessories-wallets",
      "women-shoes",
      "kids-girls-toys"
    ],
    sizes: ["s", "xs", "l", "m", "xl", "xxl", "standart", "36", "37", "39"],
    _id: "5c73e74fa898a30db019f31a",
    cssHexCode: "#53a5e4",
    colorName: "blue",
    __v: 0
  },
  {
    prices: {
      min: 59.95,
      max: 159.99
    },
    categories: [
      "women-clothing-tops",
      "women-clothing-jackets",
      "women-clothing-pants",
      "women-accessories-belts",
      "women-accessories-wallets",
      "women-clothing-dresses"
    ],
    sizes: [
      "xs",
      "s",
      "m",
      "l",
      "81 - 86 CM",
      "86 - 91 CM",
      "91 - 96 CM",
      "standart",
      "xl"
    ],
    _id: "5c73e743a898a30db019f319",
    cssHexCode: "#fffcf2",
    colorName: "beige",
    __v: 0
  },
  {
    prices: {
      min: 20,
      max: 269
    },
    categories: [
      "women-accessories-hats",
      "women-clothing-dresses",
      "women-clothing-jackets",
      "women-clothing-tops",
      "women-accessories-wallets",
      "men-clothing-shirts",
      "women-clothing-pants",
      "women-accessories-belts",
      "women-clothing-hoodies",
      "women-shoes"
    ],
    sizes: [
      "s",
      "m",
      "xs",
      "xl",
      "l",
      "standart",
      "76 - 81 CM",
      "81 - 86 CM",
      "86 - 91 CM",
      "91 - 96 CM",
      "36",
      "37",
      "38",
      "39"
    ],
    _id: "5c73e77da898a30db019f31d",
    cssHexCode: "#ffffff",
    colorName: "white",
    __v: 0
  },
  {
    prices: {
      min: 19.82,
      max: 655.55
    },
    categories: [
      "men-accessories-belts",
      "men-clothing-suits",
      "women-clothing-dresses",
      "men-clothing-pants",
      "women-clothing-pants",
      "women-clothing-tops",
      "women-accessories-wallets",
      "women-clothing-hoodies",
      "women-shoes",
      "kids-girls-toys"
    ],
    sizes: [
      "81 - 86 CM",
      "86 - 91 CM",
      "xs",
      "s",
      "l",
      "xxl",
      "m",
      "xl",
      "standart",
      "37",
      "38",
      "39"
    ],
    _id: "5c73e72da898a30db019f318",
    cssHexCode: "#121454",
    colorName: "navy blue",
    __v: 0
  },
  {
    prices: {
      min: 19.82,
      max: 159.99
    },
    categories: [
      "men-accessories-belts",
      "women-accessories-belts",
      "women-accessories-hats",
      "women-clothing-jackets",
      "women-clothing-pants",
      "women-clothing-tops",
      "women-accessories-wallets",
      "kids-girls-toys"
    ],
    sizes: [
      "76 - 81 CM",
      "81 - 86 CM",
      "86 - 91 CM",
      "91 - 96 CM",
      "xs",
      "s",
      "m",
      "l",
      "xxl",
      "standart",
      "xl"
    ],
    _id: "5c73e7d0a898a30db019f323",
    cssHexCode: "#701c29",
    colorName: "burgundy",
    __v: 0
  },
  {
    prices: {
      min: 31,
      max: 159.95
    },
    categories: [
      "men-clothing-shirts",
      "women-clothing-hoodies",
      "women-clothing-pants",
      "women-accessories-belts",
      "women-accessories-wallets",
      "women-accessories-hats",
      "women-shoes",
      "women-clothing-dresses"
    ],
    sizes: [
      "s",
      "m",
      "l",
      "xl",
      "xs",
      "76 - 81 CM",
      "81 - 86 CM",
      "91 - 96 CM",
      "86 - 91 CM",
      "standart",
      "36",
      "37",
      "38",
      "39"
    ],
    _id: "5c82bdb380cb3222d8659f74",
    cssHexCode: "#fc0404",
    colorName: "red",
    __v: 0
  }
];

describe("AdmColors component", () => {
  it("AdmColors component render", () => {
    const wrapper = shallow(
      <AdmColors
        isExistingColorsFetching={isExistingColorsFetching}
        existingColors={existingColors}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
