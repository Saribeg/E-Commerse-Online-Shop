import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getAdmNavMenuItems,
  changeSelectedItemActiveStatus
} from "../../../actions/adminDashboard/admNavMenuActions";

import "./admNavMenu.scss";

class AdmNavMenu extends Component {
  // Calling action-creator for getting from server object with Navigation Menu Items
  componentDidMount() {
    this.props.getAdmNavMenuItems();
  }

  test = (e, name, state) => {
    console.log(e.target.checked);
    console.log(name);
    console.log(state);
  };

  state = {
    chosenCategory: "",
    chosenSubCategory: ""
  };

  handleCategoryRadio = e => {
    this.setState({
      chosenCategory: e.target.value,
      chosenSubCategory: ""
    });
  };

  handleSubCategoryRadio = e => {
    this.setState({
      chosenSubCategory: e.target.value
    });
  };

  render() {
    //Creating our Category list ===========================================================
    let chosenCategory = this.state.chosenCategory;

    let categories = this.props.navMenuItems.map(category => {
      const isCategoryCurrent = chosenCategory === category.categoryName;

      return (
        <li className="admin-nav-menu-item" key={category._id}>
          <div className="admin-nav-menu-item-left">
            <label
              className={
                isCategoryCurrent
                  ? "admin-nav-menu-item-left-label admin-nav-menu-item-left-label--selected"
                  : "admin-nav-menu-item-left-label"
              }
            >
              <input
                className="admin-nav-menu-item-left-radio"
                type="radio"
                name="categories"
                value={category.categoryName}
                onChange={this.handleCategoryRadio}
              />
              {category.categoryName.charAt(0).toUpperCase() +
                category.categoryName.slice(1)}
            </label>
          </div>
          <div className="admin-nav-menu-item-right">
            <div className="onoffswitch">
              <input
                type="checkbox"
                name="onoffswitch"
                className="onoffswitch-checkbox"
                id={category.categoryName}
                defaultChecked={category.active}
                // checked={category.active}
                onChange={e =>
                  this.props.changeSelectedItemActiveStatus(
                    e,
                    this.props.navMenuItems,
                    category._id
                  )
                }
              />
              <label
                className="onoffswitch-label"
                htmlFor={category.categoryName}
              >
                <span className="onoffswitch-inner" />
                <span className="onoffswitch-switch" />
              </label>
            </div>
          </div>
        </li>
      );
    });

    // Creating our Sub-category list ===========================================================
    let chosenSubCategory = this.state.chosenSubCategory;

    let subCategories = this.props.navMenuItems.map(category => {
      if (category.categoryName === this.state.chosenCategory) {
        return category.subCategoryList.map(subCategory => {
          const isSubCategoryCurrent =
            chosenSubCategory === subCategory.subCategoryName;

          return (
            <li className="admin-nav-menu-item" key={subCategory._id}>
              <div className="admin-nav-menu-item-left">
                <label
                  className={
                    isSubCategoryCurrent
                      ? "admin-nav-menu-item-left-label admin-nav-menu-item-left-label--selected"
                      : "admin-nav-menu-item-left-label"
                  }
                >
                  <input
                    className="admin-nav-menu-item-left-radio"
                    type="radio"
                    name="subCategories"
                    value={subCategory.subCategoryName}
                    onChange={this.handleSubCategoryRadio}
                  />
                  {subCategory.subCategoryName.charAt(0).toUpperCase() +
                    subCategory.subCategoryName.slice(1)}
                </label>
              </div>
              <div className="admin-nav-menu-item-right">
                <div className="onoffswitch">
                  <input
                    type="checkbox"
                    name="onoffswitch"
                    className="onoffswitch-checkbox"
                    id={subCategory.subCategoryName}
                    defaultChecked={subCategory.active}
                    // сhecked={subCategory.active}
                    onChange={e =>
                      this.props.changeSelectedItemActiveStatus(
                        e,
                        this.props.navMenuItems,
                        subCategory._id
                      )
                    }
                  />
                  <label
                    className="onoffswitch-label"
                    htmlFor={subCategory.subCategoryName}
                  >
                    <span className="onoffswitch-inner" />
                    <span className="onoffswitch-switch" />
                  </label>
                </div>
              </div>
            </li>
          );
        });
      }
    });

    // Creating our Further Sub-category list ===========================================================
    let furtherSubCategories = this.props.navMenuItems.map(category => {
      return category.subCategoryList.map(subCategory => {
        if (
          category.categoryName === this.state.chosenCategory &&
          subCategory.subCategoryName === this.state.chosenSubCategory
        ) {
          return subCategory.furtherSubCategoryList.map(furtherSubCategory => {
            return (
              <li className="admin-nav-menu-item" key={furtherSubCategory._id}>
                <div className="admin-nav-menu-item-left">
                  {furtherSubCategory.furtherSubCategoryName}
                </div>
                <div className="admin-nav-menu-item-right">
                  <div className="onoffswitch">
                    <input
                      type="checkbox"
                      name="onoffswitch"
                      className="onoffswitch-checkbox"
                      id={furtherSubCategory.furtherSubCategoryName}
                      defaultChecked={furtherSubCategory.active}
                      // сhecked={furtherSubCategory.active}
                      onChange={e =>
                        this.props.changeSelectedItemActiveStatus(
                          e,
                          this.props.navMenuItems,
                          furtherSubCategory._id
                        )
                      }
                    />
                    <label
                      className="onoffswitch-label"
                      htmlFor={furtherSubCategory.furtherSubCategoryName}
                    >
                      <span className="onoffswitch-inner" />
                      <span className="onoffswitch-switch" />
                    </label>
                  </div>
                </div>
              </li>
            );
          });
        }
      });
    });

    return (
      <div className="admin-nav-menu-wrapper">
        <div className="admin-nav-menu-block">
          <div className="admin-nav-menu-block-heading">Category</div>
          <div className="admin-nav-menu-block-content admin-nav-menu-categories">
            <ul className="admin-nav-menu-list">{categories}</ul>
          </div>
        </div>
        <div className="admin-nav-menu-block">
          <div className="admin-nav-menu-block-heading">Sub-category</div>
          <div className="admin-nav-menu-block-content admin-nav-menu-subcategories">
            <ul className="admin-nav-menu-list">{subCategories}</ul>
          </div>
        </div>
        <div className="admin-nav-menu-block">
          <div className="admin-nav-menu-block-heading">
            Further Sub-category
          </div>
          <div className="admin-nav-menu-block-content admin-nav-menu-furthersubcategories">
            <ul className="admin-nav-menu-list">{furtherSubCategories}</ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    navMenuItems: state.navMenu.navMenuItems,
    isMenuFetching: state.navMenu.isMenuFetching
  };
};

export default connect(
  mapStateToProps,
  { getAdmNavMenuItems, changeSelectedItemActiveStatus }
)(AdmNavMenu);
