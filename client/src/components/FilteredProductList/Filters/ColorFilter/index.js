import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./colorFilter.scss";

class ColorFilter extends Component {
  render() {
    return (
      <div class="category-filter-color border-category">
        <p class="filter-title">color</p>
        <ul class="filter-color-panel">
          <li class="filter-color-panel-item">
            <NavLink to="/" class="filter-color-panel-link" />
          </li>
          <li class="filter-color-panel-item">
            <NavLink to="/" class="filter-color-panel-link" />
          </li>
          <li class="filter-color-panel-item">
            <NavLink to="/" class="filter-color-panel-link" />
          </li>
          <li class="filter-color-panel-item">
            <NavLink to="/" class="filter-color-panel-link" />
          </li>
          <li class="filter-color-panel-item">
            <NavLink to="/" class="filter-color-panel-link" />
          </li>
          <li class="filter-color-panel-item">
            <NavLink to="/" class="filter-color-panel-link" />
          </li>
          <li class="filter-color-panel-item">
            <NavLink to="/" class="filter-color-panel-link" />
          </li>
          <li class="filter-color-panel-item">
            <NavLink to="/" class="filter-color-panel-link" />
          </li>
        </ul>
      </div>
    );
  }
}

export default connect()(ColorFilter);
