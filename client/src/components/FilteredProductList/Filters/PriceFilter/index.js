import React, { Component } from "react";
import InputRange from "react-input-range";
import { connect } from "react-redux";

import { selectFilters } from "../../../../actions/filterActions";

import "react-input-range/lib/css/index.css";
import "./priceFilter.scss";

class PriceFilter extends Component {
  state = {
    value: { min: 5, max: 1000 }
  };

  componentDidMount = () => {
    let { category, subCategory, furtherSubCategory } = this.props.urlParams;
    let { currentFilters } = this.props;

    let newFilters = {
      category: category,
      subCategory: subCategory,
      furtherSubCategory: furtherSubCategory,
      colorName: currentFilters.colorName,
      size: currentFilters.size,
      price: this.state.value
    };

    this.props.selectFilters(currentFilters, newFilters);
  };

  onPriceChange = value => {
    this.setState({
      value
    });
  };

  onPriceFilter = value => {
    let { currentFilters } = this.props;

    let newFilters = {
      category: currentFilters.category,
      subCategory: currentFilters.subCategory,
      furtherSubCategory: currentFilters.furtherSubCategory,
      colorName: currentFilters.colorName,
      size: currentFilters.size,
      price: value
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
        value={this.state.value}
        allowSameValues={true}
        draggableTrack
        onChange={this.onPriceChange}
        onChangeComplete={this.onPriceFilter}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    currentFilters: state.filters.selected
  };
};

export default connect(
  mapStateToProps,
  { selectFilters }
)(PriceFilter);
