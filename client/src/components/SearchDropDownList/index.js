import React, { Component } from "react";
import { connect } from "react-redux";

import SearchResultItem from "../SearchResultItem";

import "./searchDropDownList.scss";

class SearchDropDownList extends Component {
  render() {
    const { products } = this.props;
    return (
      <div
        className={
          products.length > 0
            ? "search-results-wrapper"
            : "search-results-wrapper-hide"
        }
      >
        <ul className="search-results-list">
          <SearchResultItem />
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.search.products
  };
};

export default connect(mapStateToProps)(SearchDropDownList);
