import React, { Component } from "react";
import InputRange from "react-input-range";
import { connect } from "react-redux";

import { selectFilters } from "../../../../actions/filterActions";

import "react-input-range/lib/css/index.css";
import "./priceFilter.scss";

class PriceFilter extends Component {
  state = {
    value: { min: 2, max: 10 }
  };

  onPriceChange = value => {
    this.setState({
      value
    });
    this.props.selectFilters(this.props.currentFilters, { price: value });
  };

  render() {
    return (
      <InputRange
        formatLabel={value => `$ ${value}`}
        maxValue={1000}
        minValue={10}
        step={5}
        value={this.state.value}
        onChange={this.onPriceChange}
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
