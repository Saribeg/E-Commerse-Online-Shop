import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { getFilteredProducts } from "../../actions/filterActions";

import Filters from "./Filters";
import BreadCrumbs from "../BreadCrumbs";
import ProductCard from "../ProductCard";

import "./filteredProductList.scss";

class FilteredProductList extends Component {
  componentDidMount = () => {
    let { category, subCategory, furtherSubCategory } = this.props.match.params;
    this.props.getFilteredProducts(category, subCategory, furtherSubCategory);
  };

  render() {
    let { products, isProductFetching, currentFilters } = this.props;

    let filteredProductList = products.map(product => {
      return product.productFeatures.map(color => {
        let isSizePresent = color.sizes.some(size => {
          return currentFilters.size === size.size && size.quantity > 0;
        });

        // if (
        //   currentFilters.colorName &&
        //   currentFilters.colorName === color.colorName &&
        //   isSizePresent
        // ) {
        return (
          <ProductCard
            productUrl={product.productUrl}
            key={product._id}
            imageUrl={color.imageUrls[0]}
            model={product.model}
            colorName={color.colorName}
            currentPrice={product.currentPrice}
            previousPrice={product.previousPrice}
            currentFilters={currentFilters}
          />
          // <NavLink to={product.productUrl} key={product._id} className="product-item">
          //   <img
          //     src={color.imageUrls[0]}
          //     alt={product.model}
          //     className="product-img"
          //   />
          //   <p className="product-name">{`${product.model} (${
          //     color.colorName
          //   })`}</p>
          //   <p className="product-price">{`$${product.currentPrice}`}</p>
          //   {product.previousPrice ? (
          //     <span className="previous-price"> {product.previousPrice} </span>
          //   ) : null}
          // </NavLink>
        );
        // }
      });
    });

    return (
      <>
        <BreadCrumbs cattest={this.props.match.params} />
        <section className="category-block">
          <div className="container">
            <div className="category-content">
              <Filters urlParams={this.props.match.params} />

              <div class="category-product-listing">
                <div class="listing-products">{filteredProductList}</div>
                <div class="btn-loading-products">
                  <a to="/">loading</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.filters.products,
    isProductFetching: state.filters.isProductFetching,
    currentFilters: state.filters.selected
  };
};

export default connect(
  mapStateToProps,
  { getFilteredProducts }
)(FilteredProductList);
