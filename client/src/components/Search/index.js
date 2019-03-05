import React, { Component } from "react";
import "./Search.scss";

class Search extends Component {
  state = {
    search: "",
    focus: false
  };

  onChangeSearch = event => {
    this.setState({
      search: event.target.value
    });
  };

  onFocus = event => {
    this.setState({
      focus: true
    });
  };

  onBlur = event => {
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
