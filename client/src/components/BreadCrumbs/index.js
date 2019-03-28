// @flow

import * as React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {selectFilters, clearProductList} from "../../actions/filterActions";
import "./breadcrumbs.scss"

type Props = {
    categoryAway: Object,
    navMenuItems: Array < Object >,
    selectFilters: Object,
    currentFilters: Object,
    modelName: string,
    activeColor: string,
    clearProductList: Function,
    itemNo: number
}

class BreadCrumbs extends React.Component<Props> {
    changeCategoryFilters = (
        newCategory: string,
        newSubCategory: string,
        newFurtherSubCategory: string
    ) => {
        let {currentFilters} = this.props;

        this.props.clearProductList();

        this.props.selectFilters(currentFilters, {
            category: newCategory,
            subCategory: newSubCategory,
            furtherSubCategory: newFurtherSubCategory,
            colorName: currentFilters.colorName,
            size: currentFilters.size,
            price: currentFilters.price,
            pageNo: 1
        });
    };

    render() {
        let {category, subCategory, furtherSubCategory} = this.props.categoryAway;
        let {navMenuItems} = this.props;


        let subCategories = navMenuItems.map(cat => {
            if (cat.categoryName === category) {
                return cat.subCategoryList.map(subCat => {
                        if (subCat.subCategoryName === subCategory) {
                            let furtherSubCatList = subCat.furtherSubCategoryList.map(furtherSubCat => {
                                    if (furtherSubCategory != null || furtherSubCategory !== undefined) {
                                        if (furtherSubCat.furtherSubCategoryName === furtherSubCategory) {
                                            return (
                                                <li key={furtherSubCat._id}>
                                                    <NavLink to={furtherSubCat.furtherSubCategoryUrl}
                                                             onClick={() =>
                                                                 this.changeCategoryFilters(
                                                                     cat.categoryName,
                                                                     subCat.subCategoryName,
                                                                     furtherSubCat.furtherSubCategoryName
                                                                 )
                                                             }
                                                             className="breadcrumbs-link">{furtherSubCat.furtherSubCategoryName}
                                                    </NavLink>
                                                </li>
                                            )
                                        }
                                        return null;
                                    }
                                    return null;
                                }
                            );
                            return (<>

                                    <li key={subCat._id}>
                                        <NavLink to={subCat.subCategoryUrl}
                                                 onClick={() =>
                                                     this.changeCategoryFilters(
                                                         cat.categoryName,
                                                         subCat.subCategoryName
                                                     )
                                                 }
                                                 className="breadcrumbs-link">{subCat.subCategoryName}
                                        </NavLink>
                                    </li>
                                    {furtherSubCatList}
                                </>

                            )
                        }
                        return null;
                    }
                )
            }
            return null;
        });

        let mainCategory = navMenuItems.map(cat => {
            if (cat.categoryName === category) {
                return (
                    <li key={cat._id}>
                        <NavLink
                            to={cat.categoryUrl}
                            className="breadcrumbs-link"
                            onClick={() => this.changeCategoryFilters(cat.categoryName)}>
                            {cat.categoryName}
                        </NavLink>
                    </li>
                );
            }
            return null;
        });

        return (
            <section className="breadcrumbs-section">
                <div className="container">
                    <ul className="breadcrumbs-list">
                        <li><NavLink to="/" className="breadcrumbs-link">Home</NavLink></li>
                        {mainCategory}
                        {subCategories}
                        {this.props.modelName ?
                            <li key={this.props.itemNo}><NavLink to="/"
                                                                 className="breadcrumbs-link">{this.props.modelName} ({this.props.activeColor})</NavLink>
                            </li>
                            : null
                        }
                    </ul>
                </div>
            </section>
        )
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
    {selectFilters, clearProductList}
)(BreadCrumbs);