import React from "react";
import PriceFilter from "./index";

describe("PriceFilter component", () => {
  it("PriceFilter component render", () => {
    const wrapper = shallow(<PriceFilter />);
    expect(wrapper).toMatchSnapshot();
  });
});
