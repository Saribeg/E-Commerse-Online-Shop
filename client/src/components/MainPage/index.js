import React, { Component } from "react";
import ProductsCarousel from "../ProductsCarousel";
import Subscribe from "../Subscribe";
import ProductListing from "../ProductListing";
import CategoryCarousel from "../CategoryCarousel";
import "./MainPage.scss";

import SearchDropDownList from "../SearchDropDownList";

class MainPage extends Component {
  render() {
    return (
      <div>
        <SearchDropDownList />
        <ProductsCarousel />

        <section className="section-listing-products">
          <div className="container">
            <div className="listing">
              <h2 className="listing-title">Most popular items</h2>
              <ProductListing children={8} />
            </div>
          </div>
        </section>
        <CategoryCarousel children={5} />
        <Subscribe />
      </div>
    );
  }
}

export default MainPage;
