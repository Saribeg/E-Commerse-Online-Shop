// @flow

import * as React from "react";
import { connect } from "react-redux";

import {
  focusSearchInput,
  blurSearchInput,
  typeSearchValue,
  validateSearchValue
} from "../../actions/search";

import "./search.scss";

type Props = {};

// type State = {
//   search: string,
//   focus: boolean
// };
class Search extends React.Component<Props, State> {
  // state = {
  //   search: "",
  //   focus: false
  // };

  // onChangeSearch = (event: Object) => {
  //   this.setState({
  //     search: event.target.value
  //   });
  // };

  // onFocus = (event: Object) => {
  //   this.setState({
  //     focus: true
  //   });
  // };

  // onBlur = (event: Object) => {
  //   this.setState({
  //     focus: false,
  //     search: ""
  //   });
  // };

  render() {
    const {
      searchString,
      focus,
      nonValid,
      focusSearchInput,
      blurSearchInput,
      typeSearchValue,
      validateSearchValue
    } = this.props;
    return (
      <div className="search-input-wrapper">
        <input
          // type="text"
          // style={this.state.focus ? { width: "420px" } : { width: "185px" }}
          // className="main-search"
          // name="search"
          // placeholder="Search"
          // value={this.state.search}
          // onChange={this.onChangeSearch}
          // onFocus={this.onFocus}
          // onBlur={this.onBlur}
          type="text"
          style={focus ? { width: "420px" } : { width: "185px" }}
          className="main-search"
          name="search"
          placeholder="Search"
          value={searchString}
          onChange={e => typeSearchValue(e.target.value)}
          onFocus={focusSearchInput}
          onBlur={blurSearchInput}
          onKeyPress={e => validateSearchValue(e)}
        />
        {nonValid ? (
          <div className="non-valid-search">
            Symbols "&amp;/,*$" etc. are not allowed. Use space instead
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
    nonValid: state.search.nonValid
  };
};

export default connect(
  mapStateToProps,
  { focusSearchInput, blurSearchInput, typeSearchValue, validateSearchValue }
)(Search);
