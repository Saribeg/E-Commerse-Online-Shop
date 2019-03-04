import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import "./empty-state.scss";

export default class EmptyState extends Component {
  render() {
    let {
      isFilterResultEmpty,
      category,
      subCategory,
      furtherSubCategory,
      colorName,
      size,
      price,
      returnToMainPage,
      title
    } = this.props;

    return (
      <div className="empty-state">
        <FontAwesomeIcon icon="question" className="empty-state-icon" />
        <p className="empty-state-title">{title}</p>
        {isFilterResultEmpty ? (
          <table>
            <tr>
              <td className="filter-option-name cell">Categories: </td>
              <td className="filter-option-value cell">{`${
                furtherSubCategory
                  ? category + " - " + subCategory + " - " + furtherSubCategory
                  : subCategory
                  ? category + " - " + subCategory
                  : category
              }`}</td>
            </tr>
            <tr>
              <td className="filter-option-name cell">Color: </td>
              <td className="filter-option-value cell">
                {colorName ? colorName : "All colors"}
              </td>
            </tr>
            <tr>
              <td className="filter-option-name cell">Size:</td>
              <td className="filter-option-value cell">
                {size ? size : "All sizes"}
              </td>
            </tr>
            <tr>
              <td className="filter-option-name cell">Price: </td>
              <td className="filter-option-value cell">{`From $${
                price.min
              } to $${price.max}`}</td>
            </tr>
          </table>
        ) : null}

        {returnToMainPage ? (
          <NavLink to="/">Return to main page </NavLink>
        ) : null}
      </div>
    );
  }
}
