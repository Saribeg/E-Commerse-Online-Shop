import React, {Component} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

import Filters from "./Filters";
import ProductListing from "../ProductListing";
import BreadCrumbs from "../BreadCrumbs";

import "./filteredProductList.scss";

class FilteredProductList extends Component {
    render() {
        return (
            <>
                <BreadCrumbs/>
                <section className="category-block">
                    <div className="container">
                        <div className="category-content">
                            <Filters/>

                            <div className="category-product-listing">
                                <ProductListing children={9}/>
                                {/*<div className="listing-products">*/}
                                {/*<NavLink to="/" className="product-item">*/}
                                {/*<img src="../img/featured.png" alt="" className="product-img"/>*/}
                                {/*<p className="product-name">No-Iron Easy Care Sleeveless Shirt</p>*/}
                                {/*<p className="product-price">$599.00</p>*/}
                                {/*</NavLink>*/}
                                {/*<NavLink to="/" class="product-item">*/}
                                {/*<img src="../img/featured.png" alt="" className="product-img"/>*/}
                                {/*<p className="product-name">No-Iron Easy Care Sleeveless Shirt</p>*/}
                                {/*<p className="product-price">$599.00</p>*/}
                                {/*</NavLink>*/}
                                {/*<NavLink to="/" class="product-item">*/}
                                {/*<img src="../img/featured.png" alt="" class="product-img"/>*/}
                                {/*<p class="product-name">No-Iron Easy Care Sleeveless Shirt</p>*/}
                                {/*<p class="product-price">$599.00</p>*/}
                                {/*</NavLink>*/}
                                {/*</div>*/}
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

export default connect()(FilteredProductList);
