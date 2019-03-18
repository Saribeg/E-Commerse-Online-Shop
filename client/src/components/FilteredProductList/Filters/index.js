import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  selectFilters,
  selectSize,
  selectPrice
} from "../../../actions/filterActions";

import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";
import PriceFilter from "./PriceFilter";

import "./filters.scss";

class Filters extends Component {
  // Method for reseting all filters
  filterReset = () => {
    const { currentFilters, selectFilters } = this.props;

    this.props.selectSize(null);
    this.props.selectPrice({ min: 5, max: 1000 });

    selectFilters(currentFilters, {
      category: currentFilters.category,
      subCategory: undefined,
      furtherSubCategory: undefined,
      colorName: undefined,
      size: undefined,
      price: { min: 5, max: 1000 }
    });

    this.props.history.push(`/${currentFilters.category}`);
  };

  render() {
    return (
      <div className="category-filter">
        <div className="category-filter-active border-category">
          <div className="filter-active-title">
            <h3>filters</h3>
            <input
              className="filter-reset"
              type="button"
              value="reset"
              onClick={this.filterReset}
            />
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

const mapStateToProps = state => {
  return {
    sizeOptions: state.filters.sizeOptions,
    currentSizeOption: state.filters.currentSizeOption,
    isFilterFetching: state.filters.isFilterFetching,
    currentFilters: state.filters.selected
  };
};

export default connect(
  mapStateToProps,
  { selectFilters, selectSize, selectPrice }
)(withRouter(Filters));
