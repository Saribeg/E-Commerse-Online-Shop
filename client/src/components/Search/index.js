// @flow

import * as React from "react";
import { connect } from "react-redux";

import {
  focusSearchInput,
  blurSearchInput,
  validateSearchValue,
  search
} from "../../actions/search";

import "./search.scss";

type Props = {};

class Search extends React.Component<Props, State> {
  render() {
    const {
      search,
      searchString,
      focus,
      nonValid,
      isSearchFetching,
      products,
      focusSearchInput,
      blurSearchInput,
      validateSearchValue
    } = this.props;
    return (
      <div className="search-input-wrapper">
        <div className="search-input">
          <input
            type="text"
            style={focus ? { width: "420px" } : { width: "185px" }}
            className="main-search"
            name="search"
            placeholder="Search"
            value={searchString}
            onChange={e => search(e.target.value)}
            onFocus={focusSearchInput}
            onBlur={blurSearchInput}
            onKeyPress={e => validateSearchValue(e)}
          />
          {isSearchFetching ? (
            <div className="search-preloader" />
          ) : (
            <div className="search-preloader search-preloader-hide" />
          )}
        </div>
        {nonValid ? (
          <div className="non-valid-search">
            Symbols "&amp;/,*$" etc. are not allowed. Use space instead
          </div>
        ) : products.length < 1 &&
          searchString.length > 1 &&
          !isSearchFetching ? (
          <div className="non-valid-search">
            No products found matching{" "}
            <span className="match-words">{searchString}</span>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchString: state.search.searchString,
    focus: state.search.focus,
    nonValid: state.search.nonValid,
    isSearchFetching: state.search.isSearchFetching,
    products: state.search.products
  };
};

export default connect(
  mapStateToProps,
  {
    focusSearchInput,
    blurSearchInput,
    validateSearchValue,
    search
  }
)(Search);
