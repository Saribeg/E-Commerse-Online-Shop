import React from "react";
import ProductCard from "./index";

let id = "5c991cd6c08f5b4c587eb93c";
let productUrl = "/women/clothing/dresses/946099";
let imageUrl = "/img/products/women/clothing/dresses/946099/fffcf2/001.jpg";
let model = "natural woman mini dress";
let colorName = "beige";
let currentPrice = 132;
let previousPrice = 220;

describe("ProductCard component", () => {
  it("ProductCard component render", () => {
    const wrapper = shallow(
      <ProductCard
        productUrl={productUrl}
        key={id}
        imageUrl={imageUrl}
        model={model}
        colorName={colorName}
        currentPrice={currentPrice}
        previousPrice={previousPrice}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
