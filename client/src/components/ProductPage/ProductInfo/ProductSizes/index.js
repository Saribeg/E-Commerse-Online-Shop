// @flow

import * as React from "react";
import ProductCounter from "../../../atomic/ProductCounter";
import "./product-sizes.scss";

type Props = {
  productFeatures: Array<Object>,
  activeColor: string
};

type State = {
  productCount: number,
  chosenSize: string
};

export default class ProductSizes extends React.Component<Props, State> {
  state = {
    productCount: 0,
    chosenSize: ""
  };

  choseSizes = (maxcount: number, chosenSize: string) => {
    if (maxcount && chosenSize) {
      this.setState({
        productCount: maxcount,
        chosenSize: chosenSize
      });
    }
  };

  render() {
    let productFeatures = this.props.productFeatures;

    let sizes = productFeatures.map(elem => {
      if (elem.colorName === this.props.activeColor) {
        return elem.sizes.map(elem => {
          if (Number(elem.quantity) > 0) {
            if (this.state.chosenSize === "") {
              this.choseSizes(elem.quantity, elem.size);
            }
            return (
              <li
                key={elem._id}
                className={`${
                  this.state.chosenSize === elem.size ? "active" : ""
                } size-item`}
                onClick={() => this.choseSizes(elem.quantity, elem.size)}
              >
                {elem.size}
              </li>
            );
          }
        });
      }
    });

    return (
      <>
        <p className="product-filter">Size</p>
        <ul className="product-sizes">{sizes}</ul>
        <p className="product-filter">
          Quantity Available: {this.state.productCount}
        </p>
        <ProductCounter maxCount={this.state.productCount} />
      </>
    );
  }
}
