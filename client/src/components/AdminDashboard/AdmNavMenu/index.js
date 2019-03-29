import React, { Component } from "react";
import { connect } from "react-redux";
import Preloader from "../../Preloader";

import {
  getAdmNavMenuItems,
  changeSelectedItemActiveStatus,
  addNewCategory,
  addNewSubCategory,
  addNewFurtherSubCategory,
  saveUpdatedNavMenu
} from "../../../actions/adminDashboard/admNavMenuActions";

import "./admNavMenu.scss";

class AdmNavMenu extends Component {
  // Calling action-creator for getting from server object with Navigation Menu Items
  componentDidMount() {
    this.props.getAdmNavMenuItems();
  }

  state = {
    chosenCategory: "",
    chosenSubCategory: "",
    newCategotyName: "",
    newSubCategotyName: "",
    newFurtherSubCategotyName: "",
    errorMsg: {}
  };

  resetState = e => {
    this.setState({
      newCategotyName: "",
      newSubCategotyName: "",
      newFurtherSubCategotyName: ""
    });
  };

  handleNewItemsChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    let errors = {};

    if (e.target.value.length < 3) {
      errors[e.target.name] = "Must be at least 3 characters long";
    }

    this.setState({
      errorMsg: errors
    });
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
                category.categoryName.slice(1).toLowerCase()}
            </label>
          </div>
          <div className="admin-nav-menu-item-right">
            <div className="onoffswitch">
              <input
                type="checkbox"
                name="onoffswitch"
                className="onoffswitch-checkbox"
                id={category.categoryName}
                // defaultChecked={category.active}
                checked={category.active}
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
                    subCategory.subCategoryName.slice(1).toLowerCase()}
                </label>
              </div>
              <div className="admin-nav-menu-item-right">
                <div className="onoffswitch">
                  <input
                    type="checkbox"
                    name="onoffswitch"
                    className="onoffswitch-checkbox"
                    id={subCategory.subCategoryName}
                    // defaultChecked={subCategory.active}
                    checked={subCategory.active}
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
      return null;
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
                  {furtherSubCategory.furtherSubCategoryName
                    .charAt(0)
                    .toUpperCase() +
                    furtherSubCategory.furtherSubCategoryName
                      .slice(1)
                      .toLowerCase()}
                </div>
                <div className="admin-nav-menu-item-right">
                  <div className="onoffswitch">
                    <input
                      type="checkbox"
                      name="onoffswitch"
                      className="onoffswitch-checkbox"
                      id={furtherSubCategory.furtherSubCategoryName}
                      // defaultChecked={furtherSubCategory.active}
                      checked={furtherSubCategory.active}
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
        return null;
      });
    });

    return (
      <>
        {this.props.isMenuFetching ? (
          <Preloader />
        ) : (
          <>
            <div className="admin-nav-menu-wrapper">
              <div className="admin-nav-menu-block">
                <div className="admin-nav-menu-block-heading">Category</div>
                <div className="admin-nav-menu-block-content admin-nav-menu-categories">
                  <ul className="admin-nav-menu-list">{categories}</ul>
                  <div className="add-new-item-wrapper">
                    <input
                      className="add-new-item-input"
                      type="text"
                      name="newCategotyName"
                      placeholder="Add new category"
                      value={this.state.newCategotyName}
                      onChange={this.handleNewItemsChange}
                    />
                    <input
                      className="add-new-item-save"
                      type="button"
                      value="Save"
                      onClick={() => {
                        this.props.addNewCategory(
                          this.state.newCategotyName.toLowerCase(),
                          this.props.navMenuItems
                        );
                        this.resetState();
                      }}
                    />
                  </div>
                  {/* {validationText} */}
                  <div className="error-message">
                    {this.state.errorMsg.newCategotyName}
                  </div>
                </div>
              </div>
              <div className="admin-nav-menu-block">
                <div className="admin-nav-menu-block-heading">Sub-category</div>
                <div className="admin-nav-menu-block-content admin-nav-menu-subcategories">
                  <ul className="admin-nav-menu-list">{subCategories}</ul>
                  {this.state.chosenCategory ? (
                    <div className="add-new-item-wrapper">
                      <input
                        className="add-new-item-input"
                        type="text"
                        name="newSubCategotyName"
                        placeholder="Add new sub-category"
                        value={this.state.newSubCategotyName}
                        onChange={this.handleNewItemsChange}
                      />
                      <input
                        className="add-new-item-save"
                        type="button"
                        value="Save"
                        onClick={() => {
                          this.props.addNewSubCategory(
                            this.state.chosenCategory.toLowerCase(),
                            this.state.newSubCategotyName.toLowerCase(),
                            this.props.navMenuItems
                          );
                          this.resetState();
                        }}
                      />
                    </div>
                  ) : null}
                  {/* {validationText} */}
                  <div className="error-message">
                    {this.state.errorMsg.newSubCategotyName}
                  </div>
                </div>
              </div>
              <div className="admin-nav-menu-block">
                <div className="admin-nav-menu-block-heading">
                  Further Sub-category
                </div>
                <div className="admin-nav-menu-block-content admin-nav-menu-furthersubcategories">
                  <ul className="admin-nav-menu-list">
                    {furtherSubCategories}
                  </ul>
                  {this.state.chosenSubCategory ? (
                    <div className="add-new-item-wrapper">
                      <input
                        className="add-new-item-input"
                        type="text"
                        name="newFurtherSubCategotyName"
                        placeholder="Add new sub-sub-category"
                        value={this.state.newFurtherSubCategotyName}
                        onChange={this.handleNewItemsChange}
                      />
                      <input
                        className="add-new-item-save"
                        type="button"
                        value="Save"
                        onClick={() => {
                          this.props.addNewFurtherSubCategory(
                            this.state.chosenCategory.toLowerCase(),
                            this.state.chosenSubCategory.toLowerCase(),
                            this.state.newFurtherSubCategotyName.toLowerCase(),
                            this.props.navMenuItems
                          );
                          this.resetState();
                        }}
                      />
                    </div>
                  ) : null}
                  {/* {validationText} */}
                  <div className="error-message">
                    {this.state.errorMsg.newFurtherSubCategotyName}
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-nav-menu-actions">
              <input
                type="button"
                className="admin-nav-menu-button admin-nav-menu-reset"
                value="Reset"
                onClick={() => {
                  this.props.getAdmNavMenuItems();
                }}
              />
              <input
                type="button"
                className="admin-nav-menu-button admin-nav-menu-submit"
                value="Save Changes"
                onClick={() =>
                  this.props.saveUpdatedNavMenu(
                    this.props.navMenuItems,
                    this.props.getAdmNavMenuItems
                  )
                }
              />
            </div>
          </>
        )}
        {this.props.resultMessage ? (
          <div className="nav-menu-result-message">
            <p>{this.props.resultMessage}</p>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    navMenuItems: state.admNavMenu.navMenuItems,
    isMenuFetching: state.admNavMenu.isMenuFetching,
    resultMessage: state.admNavMenu.resultMessage
  };
};

export default connect(
  mapStateToProps,
  {
    getAdmNavMenuItems,
    changeSelectedItemActiveStatus,
    addNewCategory,
    addNewSubCategory,
    addNewFurtherSubCategory,
    saveUpdatedNavMenu
  }
)(AdmNavMenu);
