import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";

import "./searchResultItem.scss";

class SearchResultItem extends Component {
  render() {
    const { products, searchString } = this.props;

    let searchedProductList = products.map(product => {
      let productColors = product.productFeatures.map(color => {
        return (
          <li
            className="search-result-item-colors-item"
            title={color.colorName}
            key={color._id}
            style={{ backgroundColor: color.color }}
          />
        );
      });

      let productSizes = [];

      product.productFeatures.forEach(color => {
        color.sizes.forEach(size => {
          if (size.quantity > 0) {
            productSizes.push(size.size);
          }
        });
      });

      let uniqueProductSizes = [...new Set(productSizes)];

      // Rendering category matches
      let categoryMatches = AutosuggestHighlightMatch(
        product.category,
        searchString
      );
      let categoryParts = AutosuggestHighlightParse(
        product.category,
        categoryMatches
      );

      let categoryMatched = categoryParts.map((part, index) => {
        const className = part.highlight ? "match" : null;
        return <span className={className}>{part.text}</span>;
      });

      // Rendering sub-category matches
      let subCategoryMatches = AutosuggestHighlightMatch(
        product.subCategory,
        searchString
      );
      let subCategoryParts = AutosuggestHighlightParse(
        product.subCategory,
        subCategoryMatches
      );

      let subCategoryMatched = subCategoryParts.map((part, index) => {
        const className = part.highlight ? "match" : null;
        return <span className={className}>{part.text}</span>;
      });

      // Rendering further sub-category matches
      let furtherSubCategoryMatches = AutosuggestHighlightMatch(
        product.furtherSubCategory,
        searchString
      );
      let furtherSubCategoryParts = AutosuggestHighlightParse(
        product.furtherSubCategory,
        furtherSubCategoryMatches
      );

      let furtherSubCategoryMatched = furtherSubCategoryParts.map(
        (part, index) => {
          const className = part.highlight ? "match" : "unmatched-text";
          return <span className={className}>{part.text}</span>;
        }
      );

      // Rendering model name matches
      let model = product.model
        .split(" ")
        .map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");

      let modelMatches = AutosuggestHighlightMatch(model, searchString);
      let modelParts = AutosuggestHighlightParse(model, modelMatches);

      let modelMatched = modelParts.map((part, index) => {
        const className = part.highlight ? "match" : "unmatched-text";
        return <span className={className}>{part.text}</span>;
      });

      // Rendering itemNo matches
      let itemNoMatches = AutosuggestHighlightMatch(
        product.itemNo,
        searchString
      );
      let itemNoParts = AutosuggestHighlightParse(
        product.itemNo,
        itemNoMatches
      );

      let itemNoMatched = itemNoParts.map((part, index) => {
        const className = part.highlight ? "match" : "unmatched-text";
        return <span className={className}>{part.text}</span>;
      });

      // Rendering size matches
      let sizeMatches = AutosuggestHighlightMatch(
        uniqueProductSizes.join(", "),
        searchString
      );
      let sizeParts = AutosuggestHighlightParse(
        uniqueProductSizes.join(", "),
        sizeMatches
      );

      let sizeMatched = sizeParts.map((part, index) => {
        const className = part.highlight ? "match" : "unmatched-text";
        return <span className={className}>{part.text}</span>;
      });

      return (
        <li className="search-result-item" key={product._id}>
          <Link to={product.productUrl} className="search-result-link">
            <div className="search-result-item-content">
              <div className="search-result-item-image-wrapper">
                <img
                  className="search-result-item-image"
                  src={product.productFeatures[0].imageUrls[0]}
                  alt="Not available"
                />
              </div>
              <div className="search-result-item-desc">
                <span className="search-result-item-cats">
                  <span className="search-result-item-subheading">
                    Categories:
                  </span>{" "}
                  <span>
                    {categoryMatched} / {subCategoryMatched} / &nbsp;
                    {furtherSubCategoryMatched}
                  </span>
                </span>
                <span className="search-result-item-model">
                  <span className="search-result-item-subheading">
                    Model name:{" "}
                  </span>
                  {modelMatched}
                </span>
                <div className="search-result-item-colors">
                  <span className="search-result-item-subheading">Colors:</span>
                  <ul className="search-result-item-colors-list">
                    {productColors}
                  </ul>
                </div>
                <span className="search-result-item-sizes">
                  <span className="search-result-item-subheading">Sizes: </span>{" "}
                  <span className="search-result-item-sizes-values">
                    {sizeMatched}
                  </span>
                </span>
              </div>
              <div className="search-result-item-price">
                <span className="search-result-item-id">
                  <span className="search-result-item-subheading">
                    Product ID:{" "}
                  </span>{" "}
                  <span className="search-result-item-id-value">
                    {itemNoMatched}
                  </span>
                </span>
                <span className="search-result-item-subheading">Price: </span>
                <span className="search-result-item-price-current">
                  {`$${product.currentPrice}`}{" "}
                </span>
                {product.previousPrice ? (
                  <span className="search-result-item-price-previous">
                    {`$${product.previousPrice}`}
                  </span>
                ) : (
                  <span className="no-discounts">No discounts</span>
                )}
              </div>
            </div>
          </Link>
        </li>
      );
    });

    return <>{searchedProductList}</>;
  }
}

const mapStateToProps = state => {
  return {
    products: state.search.products,
    searchString: state.search.searchString
  };
};

export default connect(mapStateToProps)(SearchResultItem);
