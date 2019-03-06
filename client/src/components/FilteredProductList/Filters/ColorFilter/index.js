import React, { Component } from "react";
import { connect } from "react-redux";
import Preloader from "../../../Preloader";

import {
  getFilterElems,
  selectFilters
} from "../../../../actions/filterActions";

import "./color-filter.scss";

class ColorFilter extends Component {
  // Fetching our list of colors from server
  componentDidMount = () => {
    this.props.getFilterElems();
  };

  // Actualizing the checked radio color in store
  handleColorRadio = newColorName => {
    let { currentFilters } = this.props;

    // If user choses "all colors" - delete colorName from store to not filter by color
    if (newColorName === "all colors") {
      this.props.selectFilters(currentFilters, {
        category: currentFilters.category,
        subCategory: currentFilters.subCategory,
        furtherSubCategory: currentFilters.furtherSubCategory,
        colorName: undefined,
        size: currentFilters.size,
        price: currentFilters.price
      });
      // If user choses concret color - add the chosen colorName into store to filter by this color
    } else {
      this.props.selectFilters(currentFilters, {
        category: currentFilters.category,
        subCategory: currentFilters.subCategory,
        furtherSubCategory: currentFilters.furtherSubCategory,
        colorName: newColorName,
        size: currentFilters.size,
        price: currentFilters.price
      });
    }
  };

  render() {
    const {
      colorFilters,
      isFilterFetching,
      selectFilters,
      currentFilters,
      currentColorName
    } = this.props;

    // The list of our unique colors? that we have in db
    let colorItems = colorFilters.map(color => {
      return (
        <li className="filter-color-panel-item" key={color._id}>
          <input
            className="filter-color-panel-input"
            type="radio"
            name="colorFilters"
            value={color.colorName}
            checked={currentColorName === color.colorName}
            id={color.colorName}
            onChange={() => this.handleColorRadio(color.colorName)}
          />
          <label
            className="filter-color-panel-link"
            title={color.colorName}
            style={{ backgroundColor: color.cssHexCode }}
            htmlFor={color.colorName}
          />
        </li>
      );
    });

    return (
      <div className="category-filter-color border-category">
        <div className="color-filter-header">
          <p className="filter-title">color</p>
          <label className="reset-color-filters">
            all colors
            <input
              type="radio"
              className="filter-color-panel-input"
              name="colorFilters"
              value="all colors"
              onChange={() => this.handleColorRadio("all colors")}
            />
          </label>
        </div>
        <ul className="filter-color-panel">
          {isFilterFetching ? <Preloader /> : colorItems}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    colorFilters: state.filters.colorFilters,
    isFilterFetching: state.filters.isFilterFetching,
    currentFilters: state.filters.selected, //The object, where we store all our actual filters
    currentColorName: state.filters.selected.colorName
  };
};

export default connect(
  mapStateToProps,
  { getFilterElems, selectFilters }
)(ColorFilter);
