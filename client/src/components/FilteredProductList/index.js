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

                            <div className="category-product-listing">
                                <div className="listing-products">
                                    {filteredProductList}

                                    {/* <NavLink to="/" class="product-item">
                  <img src="../img/featured.png" alt="" class="product-img" />
                  <p class="product-name">No-Iron Easy Care Sleeveless Shirt</p>
                  <p class="product-price">$599.00</p>
                </NavLink>
                <NavLink to="/" class="product-item">
                  <img src="../img/featured.png" alt="" class="product-img" />
                  <p class="product-name">No-Iron Easy Care Sleeveless Shirt</p>
                  <p class="product-price">$599.00</p>
                </NavLink>
                <NavLink to="/" class="product-item">
                  <img src="../img/featured.png" alt="" class="product-img" />
                  <p class="product-name">No-Iron Easy Care Sleeveless Shirt</p>
                  <p class="product-price">$599.00</p>
                </NavLink> */}
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
    {getFilteredProducts}
)(FilteredProductList);
