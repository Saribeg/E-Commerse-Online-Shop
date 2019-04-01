import React, { Component } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

import {
  getFilteredProducts,
  selectFilters,
  setNewPage
} from "../../actions/filterActions";

import Filters from "./Filters";
import BreadCrumbs from "../BreadCrumbs";
import ProductCard from "../ProductCard";
import Preloader from "../Preloader";
import EmptyState from "../EmptyState";
import SearchDropDownList from "../SearchDropDownList";
import ScrollBtn from "../ScrollBtn";

import "./filteredProductList.scss";

class FilteredProductList extends Component {
  addNumberPage = () => {
    if (!this.props.isProductFetching) {
      let currentValue = this.props.currentFilters.pageNo;

      // let currentValue = page;
      currentValue++;

      console.log("currentValue", currentValue);

      let { currentFilters } = this.props;

      this.props.selectFilters(currentFilters, {
        category: currentFilters.category,
        subCategory: currentFilters.subCategory,
        furtherSubCategory: currentFilters.furtherSubCategory,
        colorName: currentFilters.colorName,
        size: currentFilters.size,
        price: currentFilters.price,
        pageNo: currentValue
      });
    }

    // this.props.setNewPage(currentValue);
  };

  componentDidMount = () => {

    window.scroll(0, 0);
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
                key={`${product.productUrl}${color._id}`}
                // key={color._id}
                imageUrl={color.imageUrls[0]}
                model={product.model}
                colorName={color.colorName}
                currentPrice={product.currentPrice}
                previousPrice={product.previousPrice}
                currentFilters={currentFilters}
              />
            );
          }
          return null;
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
                key={`${product.productUrl}${color._id}`}
                // key={color._id}
                imageUrl={color.imageUrls[0]}
                model={product.model}
                colorName={color.colorName}
                currentPrice={product.currentPrice}
                previousPrice={product.previousPrice}
                currentFilters={currentFilters}
              />
            );
          }
          return null;
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
                key={`${product.productUrl}${color._id}`}
                // key={color._id}
                imageUrl={color.imageUrls[0]}
                model={product.model}
                colorName={color.colorName}
                currentPrice={product.currentPrice}
                previousPrice={product.previousPrice}
                currentFilters={currentFilters}
              />
            );
          }
          return null;
        });
      } else {
        return product.productFeatures.map(color => {
          return (
            <ProductCard
              productUrl={product.productUrl}
              key={`${product.productUrl}${color._id}`}
              // key={color._id}
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
        <ScrollBtn scrollStepInPx="100" delayInMs="12" />
        <SearchDropDownList />
        <BreadCrumbs categoryAway={this.props.match.params} />
        <section className="category-block">
          <div className="container">
            <div className="category-content">
              <Filters urlParams={this.props.match.params} />

              <div className="category-product-listing">
                <InfiniteScroll
                  className="listing-products"
                  pageStart={0}
                  loadMore={this.addNumberPage}
                  hasMore={
                    this.props.currentFilters.pageNo <=
                    this.props.currentFilters.amountPages
                  }
                  // useWindow={false}
                  threshold={100}
                >
                  {this.props.products.length < 1 && !isProductFetching
                    ? filterEmptyState
                    : filteredProductList}
                </InfiniteScroll>

                {isProductFetching ? <Preloader /> : null}
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
  { getFilteredProducts, selectFilters, setNewPage }
)(FilteredProductList);
