import React, { Component } from "react";
import ProductCard from "../ProductCard";
import "./ProductListing.scss";

class ProductListing extends Component {
  render() {
    let listProduct = [];
    for (let i = 0; i < this.props.items; i++) {
      listProduct.push(<ProductCard />);
    }
    return <div className="listing-products">{listProduct}</div>;
  }
}

export default ProductListing;
