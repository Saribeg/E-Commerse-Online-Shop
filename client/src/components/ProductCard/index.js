import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class ProductCard extends Component {
  render() {
    let {
      productUrl,
      id,
      imageUrl,
      model,
      colorName,
      currentPrice,
      previousPrice
    } = this.props;
    return (
      <NavLink to={productUrl} key={id} className="product-item">
        <img src={imageUrl} alt={model} className="product-img" />
        <p className="product-name">{`${model} (${colorName})`}</p>
        <p className="product-price">{`$${currentPrice}`}</p>
        {previousPrice ? (
          <span className="previous-price"> {previousPrice} </span>
        ) : null}
      </NavLink>
    );
  }
}

export default ProductCard;
