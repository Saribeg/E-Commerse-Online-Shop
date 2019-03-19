import React, { Component } from "react";
import InputRange from "react-input-range";
import { connect } from "react-redux";

import { selectFilters, selectPrice } from "../../../../actions/filterActions";

import "react-input-range/lib/css/index.css";
import "./price-filter.scss";

class PriceFilter extends Component {
  componentDidMount = () => {
    let { category, subCategory, furtherSubCategory } = this.props.urlParams;
    let { currentFilters } = this.props;

    let newFilters = {
      category: category,
      subCategory: subCategory,
      furtherSubCategory: furtherSubCategory,
      colorName: currentFilters.colorName,
      size: currentFilters.size,
      price: currentFilters.price
    };

    this.props.selectFilters(currentFilters, newFilters);
  };

  onPriceFilter = price => {
    let { currentFilters } = this.props;

    let newFilters = {
      category: currentFilters.category,
      subCategory: currentFilters.subCategory,
      furtherSubCategory: currentFilters.furtherSubCategory,
      colorName: currentFilters.colorName,
      size: currentFilters.size,
      price: price
    };
    this.props.selectFilters(currentFilters, newFilters);
  };

  render() {
    return (
      <InputRange
        formatLabel={value => `$ ${value}`}
        maxValue={1000}
        minValue={5}
        step={5}
        value={this.props.currentFilters.price}
        allowSameValues={true}
        draggableTrack={true}
        onChange={this.props.selectPrice}
        onChangeComplete={this.onPriceFilter}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    currentFilters: state.filters.selected,
    selectedPrice: state.filters.selected.price
  };
};

export default connect(
  mapStateToProps,
  { selectFilters, selectPrice }
)(PriceFilter);
