import React, { Component } from "react";
import "./product-colors.scss";

export default class ProductColors extends Component {
  render() {
    const colorArray = this.props.colors;

    const colors = colorArray.map(elem => {
      let activeElement =
        elem.colorName === this.props.activeColor ? "active" : "";

      return (
        <li
          key={elem._id}
          className={`${activeElement} color-item`}
          style={{ backgroundColor: elem.color }}
          onClick={() => this.props.changeColor(elem.colorName)}
        />
      );
    });
    return <ul className="product-colors">{colors}</ul>;
  }
}
