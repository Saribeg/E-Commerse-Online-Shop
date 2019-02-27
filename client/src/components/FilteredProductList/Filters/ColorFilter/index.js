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
    this.setState({
      chosenColor: e.target.value
    });

    this.props.selectFilters(this.props.currentFilters, {
      colorName: e.target.value
    });
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
      <div class="category-filter-color border-category">
        <p class="filter-title">color</p>
        <ul class="filter-color-panel">
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
