import React, { Component } from "react";
import InputRange from "react-input-range";
import { connect } from "react-redux";

import "react-input-range/lib/css/index.css";
import "./priceFilter.scss";

class PriceFilter extends Component {
  state = {
    value: { min: 2, max: 10 }
  };

  render() {
    return (
      <InputRange
        formatLabel={value => `$ ${value}`}
        maxValue={1000}
        minValue={10}
        step={5}
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
    );
  }
}

export default connect()(PriceFilter);
