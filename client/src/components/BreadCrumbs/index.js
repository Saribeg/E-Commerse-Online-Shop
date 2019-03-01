import React, {Component} from 'react'
import {NavLink} from "react-router-dom";

class BreadCrumbs extends Component {

    render() {
        let { category, subCategory, furtherSubCategory } = this.props.categoryAway;

        let categoryUrl = "/" + this.props.categoryAway.category;
        let subCategoryUrl = categoryUrl + "/" + this.props.categoryAway.subCategory;
        let furtherSubCategoryUrl = subCategoryUrl + "/" + this.props.categoryAway.furtherSubCategory;

        return (<>
                <section className="breadcrumbs-section">
                    <div className="container">
                        <ul className="breadcrumbs-list">
                            <li><NavLink to="/" className="breadcrumbs-link">Home</NavLink></li>
                            {
                                this.props.categoryAway.category ?
                                    <li><NavLink to={categoryUrl}
                                                 className="breadcrumbs-link">{this.props.categoryAway.category}</NavLink>
                                    </li> : null
                            }
                            {
                                this.props.categoryAway.subCategory ?
                                    <li><NavLink to={subCategoryUrl}
                                                 className="breadcrumbs-link">{this.props.categoryAway.subCategory}</NavLink>
                                    </li> : null
                            }
                            {
                                this.props.categoryAway.furtherSubCategory ?
                                    <li><NavLink to={furtherSubCategoryUrl}
                                                 className="breadcrumbs-link">{this.props.categoryAway.furtherSubCategory}</NavLink>
                                    </li> : null
                            }
                            { this.props.modelName ?
                                <li><NavLink to="/" className="breadcrumbs-link">{this.props.modelName} ({this.props.activeColor})</NavLink></li>
                                : null
                            }
                        </ul>
                    </div>

                </section>

            </>
        )
    }
}


export default BreadCrumbs;