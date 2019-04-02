import React from "react";
import ProductPage from "./index";

describe("ProductPage component", () => {
  it("ProductPage component render", () => {
    const wrapper = shallow(<ProductPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
