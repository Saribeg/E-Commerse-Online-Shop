import React, {Component} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

import {getFilteredProducts} from "../../actions/filterActions";

import Filters from "./Filters";
import BreadCrumbs from "../BreadCrumbs";

import "./filteredProductList.scss";

class FilteredProductList extends Component {
    componentDidMount = () => {
        let {category, subCategory, furtherSubCategory} = this.props.match.params;
        this.props.getFilteredProducts(category, subCategory, furtherSubCategory);
    };

    render() {
        let {products, isProductFetching, currentFilters} = this.props;

        let filteredProductList = products.map(product => {
            return product.productFeatures.map(color => {
                return (
                    <NavLink to={product.productUrl} className="product-item">
                        <img
                            src={color.imageUrls[0]}
                            alt={product.model}
                            className="product-img"
                        />
                        <p className="product-name">{`${product.model} (${
                            color.colorName
                            })`}</p>
                        <p className="product-price">{`$${product.currentPrice}`}</p>
                        {product.previousPrice ? (
                            <span className="previous-price"> {product.previousPrice} </span>
                        ) : null}
                    </NavLink>
                );
            });
        });

        return (
            <>
                <BreadCrumbs cattest={this.props.match.params}/>
                <section className="category-block">
                    <div className="container">
                        <div className="category-content">
                            <Filters urlParams={this.props.match.params}/>

            <div class="category-product-listing">
              <div class="listing-products">{filteredProductList}</div>
              <div class="btn-loading-products">
                <a to="/">loading</a>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    {getFilteredProducts}
)(FilteredProductList);
