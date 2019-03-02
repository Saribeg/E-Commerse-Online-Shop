import React, { Component } from "react";
import { connect } from "react-redux";
import Preloader from "../../../Preloader";

import {
  getFilterElems,
  selectFilters
} from "../../../../actions/filterActions";

import "./colorFilter.scss";

class ColorFilter extends Component {
  state = {
    chosenColor: ""
  };

  componentDidMount = () => {
    this.props.getFilterElems();
  };

  handleColorRadio = e => {
    if (e.target.value === "all colors") {
      this.setState({
        chosenColor: ""
      });
    } else {
      this.setState({
        chosenColor: e.target.value
      });
    }

    let { currentFilters } = this.props;

    if (e.target.value === "all colors") {
      this.props.selectFilters(currentFilters, {
        category: currentFilters.category,
        subCategory: currentFilters.subCategory,
        furtherSubCategory: currentFilters.furtherSubCategory,
        colorName: undefined,
        size: currentFilters.size,
        price: currentFilters.price
      });
    } else {
      this.props.selectFilters(currentFilters, {
        category: currentFilters.category,
        subCategory: currentFilters.subCategory,
        furtherSubCategory: currentFilters.furtherSubCategory,
        colorName: e.target.value,
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
      currentFilters
    } = this.props;

    let colorItems = colorFilters.map(color => {
      const isColorCurrent = this.state.chosenColor === color.colorName;

      return (
        <li className="filter-color-panel-item" key={color._id}>
          <label
            className={
              color.colorName === "white" && isColorCurrent
                ? "filter-color-panel-link filter-color-panel-link--selected-white"
                : isColorCurrent
                ? "filter-color-panel-link filter-color-panel-link--selected"
                : "filter-color-panel-link"
            }
            title={color.colorName}
            style={
              color.colorName === "white"
                ? {
                    border: "1px solid #000000",
                    backgroundColor: color.cssHexCode
                  }
                : { backgroundColor: color.cssHexCode }
            }
          >
            <input
              className="filter-color-panel-input"
              type="radio"
              name="colorFilters"
              value={color.colorName}
              onChange={this.handleColorRadio}
            />
          </label>
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
              onChange={this.handleColorRadio}
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
    currentFilters: state.filters.selected
  };
};

export default connect(
  mapStateToProps,
  { getFilterElems, selectFilters }
)(ColorFilter);
