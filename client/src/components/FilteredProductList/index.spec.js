import React from "react";
import FilteredProductList from "./index";

let isProductFetching = false;
let currentFilters = {
  price: { min: 5, max: 1000 },
  pageNo: 1,
  category: "women"
};

let products = [
  {
    withdrawnFromSale: false,
    active: true,
    _id: "5c62e142a4b7e11ba0cc9936",
    itemNo: "407510",
    category: "women",
    subCategory: "clothing",
    furtherSubCategory: "dresses",
    model: "Bennie Scuba Dress",
    currentPrice: 159.95,
    productUrl: "/women/clothing/dresses/407510",
    productFeatures: [
      {
        color: "#000000",
        colorName: "black",
        imageUrls: [
          "/img/products/women/clothing/dresses/006/000000/040.jpg",
          "/img/products/women/clothing/dresses/006/000000/041.jpg",
          "/img/products/women/clothing/dresses/006/000000/042.jpg",
          "/img/products/women/clothing/dresses/006/000000/043.jpg"
        ],
        sizes: [
          {
            _id: "5c62e142a4b7e11ba0cc994a",
            size: "s",
            quantity: 3
          },
          {
            _id: "5c62e142a4b7e11ba0cc9949",
            size: "xs",
            quantity: 5
          },
          {
            _id: "5c62e142a4b7e11ba0cc9948",
            size: "m",
            quantity: 10
          },
          {
            _id: "5c62e142a4b7e11ba0cc9947",
            size: "l",
            quantity: 1
          }
        ],
        _id: "5c62e142a4b7e11ba0cc9946"
      },
      {
        color: "#53a5e4",
        colorName: "blue",
        imageUrls: [
          "/img/products/women/clothing/dresses/006/53a5e4/010.jpg",
          "/img/products/women/clothing/dresses/006/53a5e4/011.jpg",
          "/img/products/women/clothing/dresses/006/53a5e4/012.jpg",
          "/img/products/women/clothing/dresses/006/53a5e4/013.jpg"
        ],
        sizes: [
          {
            _id: "5c62e142a4b7e11ba0cc9945",
            size: "s",
            quantity: 3
          },
          {
            _id: "5c62e142a4b7e11ba0cc9944",
            size: "xs",
            quantity: 5
          },
          {
            _id: "5c62e142a4b7e11ba0cc9943",
            size: "m",
            quantity: 10
          },
          {
            _id: "5c62e142a4b7e11ba0cc9942",
            size: "l",
            quantity: 1
          }
        ],
        _id: "5c62e142a4b7e11ba0cc9941"
      },
      {
        color: "#f18ccb",
        colorName: "rose",
        imageUrls: [
          "/img/products/women/clothing/dresses/006/fa84bc/020.jpg",
          "/img/products/women/clothing/dresses/006/fa84bc/021.jpg",
          "/img/products/women/clothing/dresses/006/fa84bc/022.jpg",
          "/img/products/women/clothing/dresses/006/fa84bc/023.jpg"
        ],
        sizes: [
          {
            _id: "5c62e142a4b7e11ba0cc9940",
            size: "s",
            quantity: 1
          },
          {
            _id: "5c62e142a4b7e11ba0cc993f",
            size: "xs",
            quantity: 3
          },
          {
            _id: "5c62e142a4b7e11ba0cc993e",
            size: "m",
            quantity: 0
          },
          {
            _id: "5c62e142a4b7e11ba0cc993d",
            size: "l",
            quantity: 7
          }
        ],
        _id: "5c62e142a4b7e11ba0cc993c"
      },
      {
        color: "#faeb48",
        colorName: "yellow",
        imageUrls: [
          "/img/products/women/clothing/dresses/006/faeb48/030.jpg",
          "/img/products/women/clothing/dresses/006/faeb48/031.jpg",
          "/img/products/women/clothing/dresses/006/faeb48/032.jpg",
          "/img/products/women/clothing/dresses/006/faeb48/033.jpg"
        ],
        sizes: [
          {
            _id: "5c62e142a4b7e11ba0cc993b",
            size: "s",
            quantity: 0
          },
          {
            _id: "5c62e142a4b7e11ba0cc993a",
            size: "xs",
            quantity: 15
          },
          {
            _id: "5c62e142a4b7e11ba0cc9939",
            size: "m",
            quantity: 20
          },
          {
            _id: "5c62e142a4b7e11ba0cc9938",
            size: "l",
            quantity: 0
          }
        ],
        _id: "5c62e142a4b7e11ba0cc9937"
      }
    ],
    date: "2019-02-12T15:07:46.059Z",
    __v: 0
  },
  {
    withdrawnFromSale: false,
    active: true,
    _id: "5c7e96fa5eed97116815581e",
    itemNo: "588698",
    category: "women",
    subCategory: "clothing",
    furtherSubCategory: "dresses",
    model: "Cynthia Dress",
    currentPrice: 229.95,
    previousPrice: 285.6,
    productUrl: "/women/clothing/dresses/588698",
    productFeatures: [
      {
        color: "#000000",
        colorName: "black",
        imageUrls: [
          "/img/products/women/clothing/dresses/004/000000/010.jpg",
          "/img/products/women/clothing/dresses/004/000000/011.jpg",
          "/img/products/women/clothing/dresses/004/000000/012.jpg",
          "/img/products/women/clothing/dresses/004/000000/013.jpg"
        ],
        sizes: [
          {
            _id: "5c7e96fa5eed97116815582c",
            size: "xs",
            quantity: 10
          },
          {
            _id: "5c7e96fa5eed97116815582b",
            size: "s",
            quantity: 38
          },
          {
            _id: "5c7e96fa5eed97116815582a",
            size: "m",
            quantity: 5
          },
          {
            _id: "5c7e96fa5eed971168155829",
            size: "l",
            quantity: 3
          },
          {
            _id: "5c7e96fa5eed971168155828",
            size: "xl",
            quantity: 0
          },
          {
            _id: "5c7e96fa5eed971168155827",
            size: "xxl",
            quantity: 1
          }
        ],
        _id: "5c7e96fa5eed971168155826"
      },
      {
        color: "#e73e81",
        colorName: "wine",
        imageUrls: [
          "/img/products/women/clothing/dresses/004/e73e81/020.jpg",
          "/img/products/women/clothing/dresses/004/e73e81/021.jpg",
          "/img/products/women/clothing/dresses/004/e73e81/022.jpg",
          "/img/products/women/clothing/dresses/004/e73e81/023.jpg"
        ],
        sizes: [
          {
            _id: "5c7e96fa5eed971168155825",
            size: "xs",
            quantity: 3
          },
          {
            _id: "5c7e96fa5eed971168155824",
            size: "s",
            quantity: 13
          },
          {
            _id: "5c7e96fa5eed971168155823",
            size: "m",
            quantity: 0
          },
          {
            _id: "5c7e96fa5eed971168155822",
            size: "l",
            quantity: 5
          },
          {
            _id: "5c7e96fa5eed971168155821",
            size: "xl",
            quantity: 0
          },
          {
            _id: "5c7e96fa5eed971168155820",
            size: "xxl",
            quantity: 0
          }
        ],
        _id: "5c7e96fa5eed97116815581f"
      }
    ],
    date: "2019-03-05T15:34:18.832Z",
    __v: 0
  },
  {
    withdrawnFromSale: false,
    active: true,
    _id: "5c7e988f5eed97116815582d",
    itemNo: "77396",
    category: "women",
    subCategory: "clothing",
    furtherSubCategory: "dresses",
    model: "Mrs Carter Midi Dress",
    currentPrice: 269,
    productUrl: "/women/clothing/dresses/77396",
    productFeatures: [
      {
        color: "#000000",
        colorName: "black",
        imageUrls: [
          "/img/products/women/clothing/dresses/005/000000/010.jpg",
          "/img/products/women/clothing/dresses/005/000000/011.jpg",
          "/img/products/women/clothing/dresses/005/000000/012.jpg",
          "/img/products/women/clothing/dresses/005/000000/013.jpg"
        ],
        sizes: [
          {
            _id: "5c7e988f5eed971168155842",
            size: "xs",
            quantity: 0
          },
          {
            _id: "5c7e988f5eed971168155841",
            size: "s",
            quantity: 33
          },
          {
            _id: "5c7e988f5eed971168155840",
            size: "m",
            quantity: 0
          },
          {
            _id: "5c7e988f5eed97116815583f",
            size: "l",
            quantity: 20
          },
          {
            _id: "5c7e988f5eed97116815583e",
            size: "xl",
            quantity: 3
          },
          {
            _id: "5c7e988f5eed97116815583d",
            size: "xxl",
            quantity: 0
          }
        ],
        _id: "5c7e988f5eed97116815583c"
      },
      {
        color: "#121454",
        colorName: "navy blue",
        imageUrls: [
          "/img/products/women/clothing/dresses/005/121454/020.jpg",
          "/img/products/women/clothing/dresses/005/121454/021.jpg",
          "/img/products/women/clothing/dresses/005/121454/022.jpg",
          "/img/products/women/clothing/dresses/005/121454/023.jpg"
        ],
        sizes: [
          {
            _id: "5c7e988f5eed97116815583b",
            size: "xs",
            quantity: 5
          },
          {
            _id: "5c7e988f5eed97116815583a",
            size: "s",
            quantity: 13
          },
          {
            _id: "5c7e988f5eed971168155839",
            size: "m",
            quantity: 60
          },
          {
            _id: "5c7e988f5eed971168155838",
            size: "l",
            quantity: 0
          },
          {
            _id: "5c7e988f5eed971168155837",
            size: "xl",
            quantity: 0
          },
          {
            _id: "5c7e988f5eed971168155836",
            size: "xxl",
            quantity: 0
          }
        ],
        _id: "5c7e988f5eed971168155835"
      },
      {
        color: "#ffffff",
        colorName: "white",
        imageUrls: [
          "/img/products/women/clothing/dresses/005/ffffff/030.jpg",
          "/img/products/women/clothing/dresses/005/ffffff/031.jpg",
          "/img/products/women/clothing/dresses/005/ffffff/032.jpg",
          "/img/products/women/clothing/dresses/005/ffffff/033.jpg"
        ],
        sizes: [
          {
            _id: "5c7e988f5eed971168155834",
            size: "xs",
            quantity: 20
          },
          {
            _id: "5c7e988f5eed971168155833",
            size: "s",
            quantity: 17
          },
          {
            _id: "5c7e988f5eed971168155832",
            size: "m",
            quantity: 9
          },
          {
            _id: "5c7e988f5eed971168155831",
            size: "l",
            quantity: 0
          },
          {
            _id: "5c7e988f5eed971168155830",
            size: "xl",
            quantity: 1
          },
          {
            _id: "5c7e988f5eed97116815582f",
            size: "xxl",
            quantity: 0
          }
        ],
        _id: "5c7e988f5eed97116815582e"
      }
    ],
    date: "2019-03-05T15:41:03.103Z",
    __v: 0
  },
  {
    withdrawnFromSale: false,
    active: true,
    _id: "5c7e996d5eed971168155843",
    itemNo: "105092",
    category: "women",
    subCategory: "clothing",
    furtherSubCategory: "dresses",
    model: "Sallie Cowl Neck Dress",
    currentPrice: 119.95,
    productUrl: "/women/clothing/dresses/105092",
    productFeatures: [
      {
        color: "#ffffff",
        colorName: "white",
        imageUrls: [
          "/img/products/women/clothing/dresses/007/ffffff/010.jpg",
          "/img/products/women/clothing/dresses/007/ffffff/011.jpg",
          "/img/products/women/clothing/dresses/007/ffffff/012.jpg",
          "/img/products/women/clothing/dresses/007/ffffff/013.jpg"
        ],
        sizes: [
          {
            _id: "5c7e996d5eed97116815584a",
            size: "xs",
            quantity: 8
          },
          {
            _id: "5c7e996d5eed971168155849",
            size: "s",
            quantity: 8
          },
          {
            _id: "5c7e996d5eed971168155848",
            size: "m",
            quantity: 0
          },
          {
            _id: "5c7e996d5eed971168155847",
            size: "l",
            quantity: 20
          },
          {
            _id: "5c7e996d5eed971168155846",
            size: "xl",
            quantity: 0
          },
          {
            _id: "5c7e996d5eed971168155845",
            size: "xxl",
            quantity: 0
          }
        ],
        _id: "5c7e996d5eed971168155844"
      }
    ],
    date: "2019-03-05T15:44:45.281Z",
    __v: 0
  }
];

describe("FilteredProductList component", () => {
  it("FilteredProductList component render", () => {
    const wrapper = shallow(
      <FilteredProductList
        products={products}
        isProductFetching={isProductFetching}
        currentFilters={currentFilters}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
