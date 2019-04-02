import React from "react";
import ProductListing from "./index";

describe("ProductListing component", () => {
  it("ProductListing component render", () => {
    const wrapper = shallow(<ProductListing />);
    expect(wrapper).toMatchSnapshot();
  });
});
