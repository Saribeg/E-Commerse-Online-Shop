import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { getFilteredProducts } from "../../actions/filterActions";

import Filters from "./Filters";
import BreadCrumbs from "../BreadCrumbs";
import ProductCard from "../ProductCard";
import Preloader from "../Preloader";
import EmptyState from "../EmptyState";

import "./filteredProductList.scss";

class FilteredProductList extends Component {
  componentDidMount = () => {
    let { category, subCategory, furtherSubCategory } = this.props.match.params;
    this.props.getFilteredProducts(category, subCategory, furtherSubCategory);
  };

  render() {
    let { products, isProductFetching, currentFilters } = this.props;

    let filteredProductList = products.map(product => {
      if (currentFilters.colorName && !currentFilters.size) {
        return product.productFeatures.map(color => {
          if (currentFilters.colorName === color.colorName) {
            return (
              <ProductCard
                productUrl={product.productUrl}
                key={color._id}
                imageUrl={color.imageUrls[0]}
                model={product.model}
                colorName={color.colorName}
                currentPrice={product.currentPrice}
                previousPrice={product.previousPrice}
                currentFilters={currentFilters}
              />
            );
          }
        });
      } else if (currentFilters.size && !currentFilters.colorName) {
        return product.productFeatures.map(color => {
          let isSizePresent = color.sizes.some(size => {
            return currentFilters.size === size.size && size.quantity > 0;
          });

          if (isSizePresent) {
            return (
              <ProductCard
                productUrl={product.productUrl}
                key={color._id}
                imageUrl={color.imageUrls[0]}
                model={product.model}
                colorName={color.colorName}
                currentPrice={product.currentPrice}
                previousPrice={product.previousPrice}
                currentFilters={currentFilters}
              />
            );
          }
        });
      } else if (currentFilters.colorName && currentFilters.size) {
        return product.productFeatures.map(color => {
          let isSizePresent = color.sizes.some(size => {
            return currentFilters.size === size.size && size.quantity > 0;
          });

          if (currentFilters.colorName === color.colorName && isSizePresent) {
            return (
              <ProductCard
                productUrl={product.productUrl}
                key={color._id}
                imageUrl={color.imageUrls[0]}
                model={product.model}
                colorName={color.colorName}
                currentPrice={product.currentPrice}
                previousPrice={product.previousPrice}
                currentFilters={currentFilters}
              />
            );
          }
        });
      } else {
        return product.productFeatures.map(color => {
          return (
            <ProductCard
              productUrl={product.productUrl}
              key={color._id}
              imageUrl={color.imageUrls[0]}
              model={product.model}
              colorName={color.colorName}
              currentPrice={product.currentPrice}
              previousPrice={product.previousPrice}
              currentFilters={currentFilters}
            />
          );
        });
      }
    });

    let {
      category,
      subCategory,
      furtherSubCategory,
      colorName,
      size,
      price
    } = currentFilters;

    let filterEmptyState = (
      <EmptyState
        isFilterResultEmpty={true}
        category={category}
        subCategory={subCategory}
        furtherSubCategory={furtherSubCategory}
        colorName={colorName}
        size={size}
        price={price}
        returnToMainPage={false}
        title="By the following filtering options you specified, no products were found. Please try the other filters."
      />
    );

    return (
      <>
        <BreadCrumbs categoryAway={this.props.match.params} />
        <section className="category-block">
          <div className="container">
            <div className="category-content">
              <Filters urlParams={this.props.match.params} />

              <div className="category-product-listing">
                <div className="listing-products">
                  {isProductFetching ? (
                    <Preloader />
                  ) : this.props.products.length < 1 ? (
                    filterEmptyState
                  ) : (
                    filteredProductList
                  )}
                </div>
                <div className="btn-loading-products">
                  <NavLink to="/">loading</NavLink>
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
