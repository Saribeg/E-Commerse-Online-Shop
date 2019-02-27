import React, { Component, Fragment } from "react";
import ProductCounter from "../../../atomic/ProductCounter";
import './product-sizes.scss'

export default class ProductSizes extends Component {
  state = {
		productCount: 0, 
		chosenSize: ''
  };

  choseSizes = (maxcount, chosenSize) => {
		if(maxcount, chosenSize){
			this.setState({
				productCount: maxcount,
				chosenSize: chosenSize
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
					console.log(elem.size)
					this.choseSizes(elem.quantity, elem.size);
				}
            return (
              <li key={elem._id}
                className="size-item"
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
        <p className="product-filter">Quantity</p>
        <ProductCounter maxCount={this.state.productCount} />
      </Fragment>
    );
  }
}
