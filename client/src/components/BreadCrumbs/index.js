import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import "./BreadCrumbs.scss";

class BreadCrumbs extends Component {

    render() {
        let categoryName = this.props.match.params.category;
        let subcategoryName = this.props.match.params.subcategory;
        let furthersubcategoryName = this.props.match.params.furthersubcategory;

        // let paths = [];
        return (<>
                <section className="breadcrumbs-section">
                    <div className="container">
                        <ul className="breadcrumbs-list">
                            <li><NavLink to="/" className="breadcrumbs-link">Home</NavLink></li>
                            <li><NavLink to="/" className="breadcrumbs-link">{categoryName}</NavLink></li>
                            <li><NavLink to="/" className="breadcrumbs-link">{subcategoryName}</NavLink></li>
                            <li><NavLink to="/" className="breadcrumbs-link">{furthersubcategoryName}</NavLink></li>
                            {/*<li><NavLink to="/" className="breadcrumbs-link"></NavLink></li>*/}
                        </ul>
                    </div>

                </section>
            {/*<section className="breadcrumbs-block">*/}
                {/*<div className="container">*/}
                    {/*<div className="breadcrumbs">*/}
                        {/*<div className="breadcrumbs-row">*/}
                            {/*<ul>*/}
                                {/*<li><NavLink to="/">home</NavLink></li>*/}
                                {/*<li><NavLink to="/">{categoryName}</NavLink></li>*/}
                                {/*<li><NavLink to="/">{subcategoryName}</NavLink></li>*/}
                                {/*<li><NavLink to="/">{furthersubcategoryName}</NavLink></li>*/}
                            {/*</ul>*/}
                        {/*</div>*/}

            {/*//             <div className="category-title-active">*/}
            {/*//                 <h2>{categoryName}'s {subcategoryName}</h2>*/}
            {/*//             </div>*/}
            {/*//         </div>*/}
            {/*//     </div>*/}
            {/*// </section>*/}
            </>
        )
    }
}


export default BreadCrumbs;