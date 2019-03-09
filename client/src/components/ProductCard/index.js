// @flow

import * as React from "react";
import { NavLink } from "react-router-dom";
import {connect} from "react-redux";
import {saveProductDetails} from "../../actions/product";

type Props = {
  productUrl: string,
  id: string,
  imageUrl: string,
  model: string,
  colorName: string,
  currentPrice: number,
  previousPrice: number,
  saveProductDetails: Function
};

class ProductCard extends React.Component<Props> {
  render() {   
    let {productUrl, id, imageUrl, model, colorName, currentPrice, previousPrice} = this.props;

    return (
      <NavLink to={productUrl} key={id} className="product-item" onClick={()=> this.props.saveProductDetails(colorName)}>
        <img src={imageUrl} alt={model} className="product-img" />
        <p className="product-name">{`${model} (${colorName})`}</p>
        <p className="product-price">{`$${currentPrice}`}</p>
        {previousPrice ? (
          <span className="previous-price"> {`$${previousPrice}`} </span>
        ) : null}
      </NavLink>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
	return {
    saveProductDetails: (data) => dispatch(saveProductDetails(data)),
	}
}

export default connect(null, mapDispatchToProps)( ProductCard);


