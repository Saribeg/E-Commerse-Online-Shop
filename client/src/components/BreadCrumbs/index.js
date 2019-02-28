import React, {Component} from 'react'
import {NavLink} from "react-router-dom";

class BreadCrumbs extends Component {

    render() {
        let {category, subcategory, furthersubcategory} = this.props.cattest;

        return (<>
                <section className="breadcrumbs-section">
                    <div className="container">
                        <ul className="breadcrumbs-list">
                            <li><NavLink to="/" className="breadcrumbs-link">Home</NavLink></li>
                            {
                                this.props.cattest.category ?
                                    <li><NavLink to="/"
                                                 className="breadcrumbs-link">{this.props.cattest.category}</NavLink>
                                    </li> : null
                            }
                            {
                                (this.props.cattest.subcategory || this.props.cattest.subCategory) ?
                                    <li><NavLink to="/"
                                                 className="breadcrumbs-link">{this.props.cattest.subcategory || this.props.cattest.subCategory}</NavLink>
                                    </li> : null
                            }
                            {
                                (this.props.cattest.furthersubcategory || this.props.cattest.furtherSubCategory) ?
                                    <li><NavLink to="/"
                                                 className="breadcrumbs-link">{this.props.cattest.furthersubcategory || this.props.cattest.furtherSubCategory}</NavLink>
                                    </li> : null
                            }
                            {/*<li><NavLink to="/" className="breadcrumbs-link"></NavLink></li>*/}
                        </ul>
                    </div>

                </section>

            </>
        )
    }
}


export default BreadCrumbs;