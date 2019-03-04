import React, { Component } from "react";

import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";
import PriceFilter from "./PriceFilter";

import "./filters.scss";

class Filters extends Component {
  render() {
    return (
      <div className="category-filter">
        <div className="category-filter-active border-category">
          <div className="filter-active-title">
            <h3>filters</h3>
            <input className="filter-reset" type="button" value="reset" />
          </div>
        </div>
        <CategoryFilter urlParams={this.props.urlParams} />
        <PriceFilter urlParams={this.props.urlParams} />
        <ColorFilter />
        <SizeFilter />
      </div>
    );
  }
}

export default Filters;
