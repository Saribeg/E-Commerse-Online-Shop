import React, { Component, Fragment } from "react";
import ProductCounter from "../../../atomic/ProductCounter";

export default class ProductSizes extends Component {
  state = {
    productCount: 0
  };

  getAvailableSizes = maxcount => {
    this.setState({
      productCount: maxcount
    });
    console.log(this.state);
  };

  render() {
    let productFeatures = this.props.productFeatures;

    let sizes = productFeatures.map(elem => {
      if (elem.colorName === this.props.activeColor) {
        return elem.sizes.map(elem => {
          if (Number(elem.quantity) > 0) {
            return (
              <li
                className="size-item"
                onClick={() => this.getAvailableSizes(elem.quantity)}
              >
                {elem.size}
              </li>
            );
          }
        });
      }
    });

    return (
      <Fragment>
        <p className="product-filter">Size</p>
        <ul className="product-sizes">{sizes}</ul>
        <p class="product-filter">Quantity</p>
        <ProductCounter maxCount={this.state.productCount} />
      </Fragment>
    );
  }
}
