import React from "react";
import App from "./App";

describe("App component", () => {
  it("App component render", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
