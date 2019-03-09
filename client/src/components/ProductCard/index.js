// @flow

import * as React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  productUrl: string,
  id: string,
  imageUrl: string,
  model: string,
  colorName: string,
  currentPrice: number,
  previousPrice: number
};

class ProductCard extends React.Component<Props> {
  render() {   
    let {productUrl, id, imageUrl, model, colorName, currentPrice, previousPrice} = this.props;

    return (
      <NavLink to={productUrl} key={id} className="product-item">
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

export default ProductCard;
