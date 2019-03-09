// @flow

import * as React from "react";
import "./search.scss";

type Props = {};

type State = {
  search: string,
  focus: boolean
}
class Search extends React.Component<Props, State> {
  
  state = {
    search: "",
    focus: false
  };

  onChangeSearch = (event: Object) => {
    this.setState({
      search: event.target.value
    });
  };

  onFocus = (event: Object) => {
    this.setState({
      focus: true
    });
  };

  onBlur = (event: Object) => {
    this.setState({
      focus: false,
      search: ""
    });
  };

  render() {
    return (
      <>
        <input
          type="text"
          style={this.state.focus ? { width: "420px" } : { width: "185px" }}
          className="main-search"
          name="search"
          placeholder="Search"
          value={this.state.search}
          onChange={this.onChangeSearch}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </>
    );
  }
}

export default Search;
