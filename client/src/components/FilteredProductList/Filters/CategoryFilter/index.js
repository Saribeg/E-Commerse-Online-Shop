import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { selectFilters } from "../../../../actions/filterActions";

import "./category-filter.scss";

class CategoryFilter extends Component {
  changeCategoryFilters = (
    newCategory,
    newSubCategory,
    newFurtherSubCategory
  ) => {
    let { currentFilters } = this.props;

    this.props.selectFilters(currentFilters, {
      category: newCategory,
      subCategory: newSubCategory,
      furtherSubCategory: newFurtherSubCategory,
      colorName: currentFilters.colorName,
      size: currentFilters.size,
      price: currentFilters.price
    });
  };

  render() {
    let { category } = this.props.urlParams;
    let { navMenuItems } = this.props;

    let subCategories = navMenuItems.map(cat => {
      if (cat.categoryName === category) {
        return cat.subCategoryList.map(subCat => {
          let furtherSubCatList = subCat.furtherSubCategoryList.map(
            furtherSubCat => {
              return (
                <li
                  className="further-sub-category-item"
                  key={furtherSubCat._id}
                >
                  <NavLink
                    to={furtherSubCat.furtherSubCategoryUrl}
                    className="further-sub-category-link"
                    activeClassName="further-sub-category-link-active"
                    onClick={() =>
                      this.changeCategoryFilters(
                        cat.categoryName,
                        subCat.subCategoryName,
                        furtherSubCat.furtherSubCategoryName
                      )
                    }
                  >
                    {furtherSubCat.furtherSubCategoryName}
                  </NavLink>
                </li>
              );
            }
          );

          return (
            <div className="category-item" key={subCat._id}>
              <NavLink
                to={subCat.subCategoryUrl}
                className="category-item-title"
                activeClassName="category-item-title-active"
                onClick={() =>
                  this.changeCategoryFilters(
                    cat.categoryName,
                    subCat.subCategoryName
                  )
                }
              >
                {subCat.subCategoryName}
              </NavLink>
              <ul className="category-item-sub-menu">{furtherSubCatList}</ul>
            </div>
          );
        });
      }
      return null;
    });

    let categoryFilters = navMenuItems.map(cat => {
      if (cat.categoryName === category) {
        return (
          <div className="category-list border-category" key={cat._id}>
            <NavLink
              to={cat.categoryUrl}
              className="filter-title"
              activeClassName="filter-title-active"
              onClick={() => this.changeCategoryFilters(cat.categoryName)}
            >
              {`Shop ${cat.categoryName}`}
            </NavLink>
            <div className="category-list-menu">{subCategories}</div>
          </div>
        );
      }
    });

    return <>{categoryFilters}</>;
  }
}

const mapStateToProps = state => {
  return {
    navMenuItems: state.navMenu.navMenuItems,
    currentFilters: state.filters.selected
  };
};

export default connect(
  mapStateToProps,
  { selectFilters }
)(CategoryFilter);
