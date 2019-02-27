import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { selectFilters } from "../../../../actions/filterActions";

import Preloader from "../../../Preloader";

import "./sizeFilter.scss";

class SizeFilter extends Component {
  state = {
    selectedOption: null
  };

  sizeFilterChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.selectFilters(this.props.currentFilters, {
      size: selectedOption.value
    });
  };

  render() {
    const { selectedOption } = this.state;
    const { sizeFilters, sizeOptions, isFilterFetching } = this.props;

    return (
      <Select
        value={selectedOption}
        onChange={this.sizeFilterChange}
        options={sizeOptions}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    sizeFilters: state.filters.sizeFilters,
    sizeOptions: state.filters.sizeOptions,
    isFilterFetching: state.filters.isFilterFetching,
    currentFilters: state.filters.selected
  };
};

export default connect(
  mapStateToProps,
  { selectFilters }
)(SizeFilter);
