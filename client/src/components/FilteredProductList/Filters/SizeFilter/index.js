import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { selectFilters, selectSize } from "../../../../actions/filterActions";

import Preloader from "../../../Preloader";

import "./sizeFilter.scss";

class SizeFilter extends Component {
  sizeFilterChange = selectedOption => {
    this.props.selectSize(selectedOption);

    let { currentFilters } = this.props;

    if (selectedOption.value === "all sizes") {
      this.props.selectFilters(currentFilters, {
        category: currentFilters.category,
        subCategory: currentFilters.subCategory,
        furtherSubCategory: currentFilters.furtherSubCategory,
        colorName: currentFilters.colorName,
        size: undefined,
        price: currentFilters.price
      });
    } else {
      this.props.selectFilters(currentFilters, {
        category: currentFilters.category,
        subCategory: currentFilters.subCategory,
        furtherSubCategory: currentFilters.furtherSubCategory,
        colorName: currentFilters.colorName,
        size: selectedOption.value,
        price: currentFilters.price
      });
    }
  };

  render() {
    const {
      sizeFilters,
      isFilterFetching,
      currentSizeOption,
      currentFilters
    } = this.props;

    let { category, subCategory, furtherSubCategory } = currentFilters;
    let currentCategories = `${
      furtherSubCategory
        ? category + "-" + subCategory + "-" + furtherSubCategory
        : subCategory
        ? category + "-" + subCategory
        : category
    }`;

    let currentCategoriesLength;

    if (currentCategories.includes("-")) {
      currentCategoriesLength = currentCategories.split("-").length;
    } else {
      currentCategoriesLength = 1;
    }

    let relevantSizeOptions = sizeFilters
      .map(size => {
        let sizeIsPresentInCategories = size.categories.some(cat => {
          let splitedCat = cat.split("-");
          splitedCat.length = currentCategoriesLength;
          let sizeCategories = splitedCat.join("-");
          return sizeCategories === currentCategories;
        });

        if (sizeIsPresentInCategories) {
          return {
            value: size.value,
            label: size.value
          };
        }
      })
      .filter(item => {
        return item !== undefined;
      });

    relevantSizeOptions.unshift({
      value: "all sizes",
      label: "All sizes"
    });

    return (
      <>
        {isFilterFetching ? (
          <Preloader />
        ) : (
          <><p className="filter-title">Size</p>
          <Select
            value={currentSizeOption}
            onChange={this.sizeFilterChange}
            options={relevantSizeOptions}
          />
           </>
        )}
       
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    sizeFilters: state.filters.sizeFilters,
    currentSizeOption: state.filters.currentSizeOption,
    isFilterFetching: state.filters.isFilterFetching,
    currentFilters: state.filters.selected
  };
};

export default connect(
  mapStateToProps,
  { selectFilters, selectSize }
)(SizeFilter);
