import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./searchResultItem.scss";

class SearchResultItem extends Component {
  render() {
    const { products } = this.props;

    let searchedProductList = products.map(product => {
      let productColors = product.productFeatures.map(color => {
        return (
          <li
            className="search-result-item-colors-item"
            title={color.colorName}
            key={color._id}
            style={{ backgroundColor: color.color }}
          />
        );
      });

      let productSizes = [];

      product.productFeatures.forEach(color => {
        color.sizes.forEach(size => {
          if (size.quantity > 0) {
            productSizes.push(size.size);
          }
        });
      });

      let uniqueProductSizes = [...new Set(productSizes)];

      return (
        <li className="search-result-item" key={product._id}>
          <Link to={product.productUrl} className="search-result-link">
            <div className="search-result-item-content">
              <div className="search-result-item-image-wrapper">
                <img
                  className="search-result-item-image"
                  src={product.productFeatures[0].imageUrls[0]}
                  alt="Not available"
                />
              </div>
              <div className="search-result-item-desc">
                <span className="search-result-item-cats">
                  <span className="search-result-item-subheading">
                    Categories:
                  </span>{" "}
                  {`${product.category} / ${product.subCategory} / ${
                    product.furtherSubCategory
                  }`}
                </span>
                <span className="search-result-item-model">
                  <span className="search-result-item-subheading">
                    Model name:{" "}
                  </span>
                  {product.model}
                </span>
                <div className="search-result-item-colors">
                  <span className="search-result-item-subheading">Colors:</span>
                  <ul className="search-result-item-colors-list">
                    {productColors}
                  </ul>
                </div>
                <span className="search-result-item-sizes">
                  <span className="search-result-item-subheading">Sizes: </span>{" "}
                  <span className="search-result-item-sizes-values">
                    {uniqueProductSizes.join(", ")}
                  </span>
                </span>
              </div>
              <div className="search-result-item-price">
                <span className="search-result-item-id">
                  <span className="search-result-item-subheading">
                    Product ID:{" "}
                  </span>{" "}
                  <span className="search-result-item-id-value">
                    {product.itemNo}
                  </span>
                </span>
                <span className="search-result-item-subheading">Price: </span>
                <span className="search-result-item-price-current">
                  {`$${product.currentPrice}`}{" "}
                </span>
                {product.previousPrice ? (
                  <span className="search-result-item-price-previous">
                    {`$${product.previousPrice}`}
                  </span>
                ) : (
                  <span className="no-discounts">No discounts</span>
                )}
              </div>
            </div>
          </Link>
        </li>
      );
    });

    return <>{searchedProductList}</>;
  }
}

const mapStateToProps = state => {
  return {
    products: state.search.products
  };
};

export default connect(mapStateToProps)(SearchResultItem);
