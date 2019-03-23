import React, { Component } from "react";
import ProductsCarousel from "../ProductsCarousel";
import Subscribe from "../Subscribe";
import ProductListing from "../ProductListing";
import CategoryCarousel from "../CategoryCarousel";
import ScrollBtn from "../ScrollBtn";
import "./MainPage.scss";

import SearchDropDownList from "../SearchDropDownList";

class MainPage extends Component {
  render() {
    return (
      <>
          <ScrollBtn scrollStepInPx="100" delayInMs="12"/>
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
        <CategoryCarousel/>
        <Subscribe />
      </>
    );
  }
}

export default MainPage;
