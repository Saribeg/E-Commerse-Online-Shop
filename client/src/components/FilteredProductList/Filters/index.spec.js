import React from "react";
import Filters from "./index";

describe("Filters component", () => {
  it("Filters component render", () => {
    const wrapper = shallow(<Filters />);
    expect(wrapper).toMatchSnapshot();
  });
});
