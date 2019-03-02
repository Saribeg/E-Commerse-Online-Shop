import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getNavMenuItems,
  openSubMenu,
  closeSubMenu
} from "../../../actions/navMenuActions";

import Preloader from "../../Preloader";

// import "../../../scss/style.scss";
import "./navMenu.scss";

class NavMenu extends Component {
  // Calling action-creator for getting from server object with Navigation Menu Items
  componentDidMount() {
    this.props.getNavMenuItems();
  }

  render() {
    // Creating the category list (men, women)
    let menuList = this.props.navMenuItems.map(e => {
      return (
        <li
          className="main-menu-item"
          key={e._id}
          onMouseOver={() => this.props.openSubMenu(e.categoryName)}
        >
          <Link to={e.categoryUrl} className="main-menu-link">
            {e.categoryName}
          </Link>
        </li>
      );
    });

    // Creating list of subcategories (e.g. clothing) and further subcategories (e.g. shirts, pants)
    let subMenuList = this.props.navMenuItems.map(category => {
      if (category.categoryName === this.props.currentOnMouseOverCategory) {
        return category.subCategoryList.map(subCategory => {
          // further subcategories (e.g. shirts, pants)
          let subfurtherSubCategory = subCategory.furtherSubCategoryList.map(
            furtherSubCategory => {
              return (
                <li
                  className="sub-menu-category-item"
                  key={furtherSubCategory._id}
                >
                  <Link
                    to={furtherSubCategory.furtherSubCategoryUrl}
                    className="sub-menu-category-link"
                  >
                    {furtherSubCategory.furtherSubCategoryName}
                  </Link>
                </li>
              );
            }
          );

          // subcategories (e.g. clothing)
          return (
            <div className="sub-menu-left-list" key={subCategory._id}>
              <Link
                to={subCategory.subCategoryUrl}
                className="sub-menu-left-title"
              >
                {subCategory.subCategoryName.charAt(0).toUpperCase() +
                  subCategory.subCategoryName.slice(1)}
              </Link>
              <ul className="sub-menu-category-list">
                {subfurtherSubCategory}
              </ul>
            </div>
          );
        });
      }
      return null; // to return a value at the end of arrow function as it is expected
    });

    let subMenuSection = (
      <section
        className="sub-menu-wrapper"
        onMouseLeave={this.props.closeSubMenu}
      >
        <div className="container">
          <div className="sub-menu-wrapper-inner">
            <div className="sub-menu-left">{subMenuList}</div>
          </div>
        </div>
      </section>
    );

    // Rendering the whole component
    return (
      <Fragment>
        <ul className="main-menu-list">
          {this.props.isMenuFetching ? <Preloader /> : menuList}
        </ul>

        {this.props.navMenuWindowStatus ? subMenuSection : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    navMenuItems: state.navMenu.navMenuItems,
    isMenuFetching: state.navMenu.isMenuFetching,
    navMenuWindowStatus: state.navMenu.navMenuWindowStatus,
    currentOnMouseOverCategory: state.navMenu.currentOnMouseOverCategory
  };
};

export default connect(
  mapStateToProps,
  { getNavMenuItems, openSubMenu, closeSubMenu }
)(NavMenu);
