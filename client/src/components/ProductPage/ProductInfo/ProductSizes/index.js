import React, { Component, Fragment } from "react";
import ProductCounter from "../../../atomic/ProductCounter";

export default class ProductSizes extends Component {
  state = {
		productCount: 0,
    chosenSize: '',
    activeClass: false
  };

  choseSizes = (maxcount, chosenSize) => {
		if(maxcount, chosenSize){
			this.setState({
				productCount: maxcount,
        chosenSize: chosenSize,
      });

			console.log(this.state);
		}

  };

  render() {

		let productFeatures = this.props.productFeatures;
		let chosenSize = this.state.chosenSize;

    let sizes = productFeatures.map(elem => {
      if (elem.colorName === this.props.activeColor) {
        return elem.sizes.map(elem => {
      if (Number(elem.quantity) > 0) {
				if (this.state.chosenSize === "") {
					this.choseSizes(elem.quantity, elem.size);
				}
            return (
              <li key={elem._id}
                className={`${this.state.chosenSize === elem.size ? 'active' : null} size-item`}
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
      <Fragment>
        <p className="product-filter">Size</p>
        <ul className="product-sizes">{sizes}</ul>
        <p className="product-filter">Quantity Available: {this.state.productCount}</p>
        <ProductCounter maxCount={this.state.productCount} />
      </Fragment>
    );
  }
}
