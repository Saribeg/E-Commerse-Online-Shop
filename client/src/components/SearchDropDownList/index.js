import React, { Component } from "react";
import { connect } from "react-redux";

import SearchResultItem from "../SearchResultItem";

import "./searchDropDownList.scss";

class SearchDropDownList extends Component {
  render() {
    const { products, closeResults } = this.props;
    return (
      <div
        className={
          products.length > 0 && !closeResults
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
    products: state.search.products,
    closeResults: state.search.closeResults
  };
};

export default connect(mapStateToProps)(SearchDropDownList);
