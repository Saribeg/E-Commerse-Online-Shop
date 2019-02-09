import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getNavMenuItems,
  openSubMenu,
  closeSubMenu
} from "../../../actions/navMenuActions";

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
          onMouseOver={this.props.openSubMenu}
        >
          <Link to={e.categoryUrl} className="main-menu-link">
            {e.categoryName}
          </Link>
        </li>
      );
    });

    // Creating list of subcategories (e.g. clothing) and further subcategories (e.g. shirts, pants)
    let subMenuList = this.props.navMenuItems.map(category => {
      return category.subCategoryList.map(subCategory => {
        // further subcategories (e.g. shirts, pants)
        let subfurtherSubCategory = subCategory.furtherSubCategoryList.map(
          furtherSubCategory => {
            return (
              <ul
                className="sub-menu-category-list"
                key={furtherSubCategory._id}
              >
                <li className="sub-menu-category-item">
                  <Link
                    to={furtherSubCategory.furtherSubCategoryUrl}
                    className="sub-menu-category-link"
                  >
                    {furtherSubCategory.furtherSubCategoryName}
                  </Link>
                </li>
              </ul>
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
              {subCategory.subCategoryName}
            </Link>
            {subfurtherSubCategory}
          </div>
        );
      });
    });

    // Rendering the whole component
    return (
      <Fragment>
        <ul className="main-menu-list">
          {this.props.isMenuFetching ? <li>Загрузка...</li> : menuList}
        </ul>

        <section
          className="sub-menu-wrapper"
          onMouseLeave={this.props.closeSubMenu}
        >
          <div className="container">
            <div className="sub-menu-wrapper-inner">
              <div className="sub-menu-left">
                {this.props.navMenuWindowStatus ? subMenuList : null}
              </div>
              <div className="sub-menu-right">
                <Link
                  to="/women/clotjing/outlets"
                  className="sub-menu-right-item"
                >
                  <div className="sub-menu-right-title">Outlet</div>
                </Link>
                <Link
                  to="/women/clotjing/exclusive"
                  className="sub-menu-right-item"
                >
                  <div className="sub-menu-right-title">Exclusive</div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    navMenuItems: state.navMenu.navMenuItems,
    isMenuFetching: state.navMenu.isMenuFetching,
    navMenuWindowStatus: state.navMenu.navMenuWindowStatus
  };
};

export default connect(
  mapStateToProps,
  { getNavMenuItems, openSubMenu, closeSubMenu }
)(NavMenu);
