import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { selectFilters } from "../../../../actions/filterActions";

import "./categoryFilter.scss";

class CategoryFilter extends Component {
  componentDidMount = () => {
    let { category, subCategory, furtherSubCategory } = this.props.urlParams;

    let newFilters = {
      category: category,
      subCategory: subCategory,
      furtherSubCategory: furtherSubCategory
    };

    this.props.selectFilters(this.props.currentFilters, newFilters);
  };

  render() {
    let { category, subCategory, furtherSubCategory } = this.props.urlParams;
    let { navMenuItems, selectFilters, currentFilters } = this.props;

    let subCategories = navMenuItems.map(cat => {
      if (cat.categoryName === category) {
        return cat.subCategoryList.map(subCat => {
          let furtherSubCatList = subCat.furtherSubCategoryList.map(
            furtherSubCat => {
              let newFilters = {
                category: cat.categoryName,
                subCategory: subCat.subCategoryName,
                furtherSubCategory: furtherSubCat.furtherSubCategoryName
              };

              return (
                <li
                  className="further-sub-category-item"
                  key={furtherSubCat._id}
                >
                  <NavLink
                    to={furtherSubCat.furtherSubCategoryUrl}
                    className="further-sub-category-link"
                    activeClassName="further-sub-category-link-active"
                    onClick={() => selectFilters(currentFilters, newFilters)}
                  >
                    {furtherSubCat.furtherSubCategoryName}
                  </NavLink>
                </li>
              );
            }
          );

          let newFilters = {
            category: cat.categoryName,
            subCategory: subCat.subCategoryName
          };

          return (
            <div className="category-item" key={subCat._id}>
              <NavLink
                to={subCat.subCategoryUrl}
                className="category-item-title"
                activeClassName="category-item-title-active"
                onClick={() => selectFilters(currentFilters, newFilters)}
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
        let newFilters = {
          category: cat.categoryName
        };

        return (
          <div className="category-list border-category" key={cat._id}>
            <NavLink
              to={cat.categoryUrl}
              className="filter-title"
              activeClassName="filter-title-active"
              onClick={() => selectFilters(currentFilters, newFilters)}
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
