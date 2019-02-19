import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import Filters from "./Filters";

import "./filteredProductList.scss";

class FilteredProductList extends Component {
  render() {
    return (
      <section class="category-block">
        <div class="container">
          <div class="category-content">
            <Filters />

            <div class="category-product-listing">
              <div class="listing-products">
                <NavLink to="/" class="product-item">
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
                </NavLink>
              </div>
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

export default connect()(FilteredProductList);
