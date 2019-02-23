import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./categoryFilter.scss";

class CategoryFilter extends Component {
  render() {
    // const categoryName = this.props.match.params.id;
    return (
      <div class="category-list border-category">
        <NavLink to="/" className="filter-title">
          Shop women
        </NavLink>
        <div className="category-list-menu">
          <div className="category-item">
            <NavLink to="/" className="category-item-title">
              Outfits
            </NavLink>
            <ul className="category-item-sub-menu">
              <li className="">
                <NavLink to="/" className="">
                  Tops
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/" className="">
                  Dresses
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/" className="">
                  Buttoms
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/" className="">
                  jackets and coats
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="category-item">
            <NavLink to="/" className="category-item-title">
              Jewerly
            </NavLink>
            <ul className="category-item-sub-menu">
              <li className="">
                <NavLink to="/" className="">
                  earrings
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/" className="">
                  Bracelets
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/" className="">
                  Bracelets
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="category-item">
            <NavLink to="/" className="category-item-title">
              Accessories
            </NavLink>
            <ul className="category-item-sub-menu">
              <li className="">
                <NavLink to="/" className="">
                  Houseware
                </NavLink>
              </li>
              <li className="">
                <NavLink to="/" className="">
                  Gift Cards
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    navMenuItems: state.navMenu.navMenuItems,
    isCategoryFilterFetching: state.navMenu.isCategoryFilterFetching
  };
};

export default connect()(CategoryFilter);
