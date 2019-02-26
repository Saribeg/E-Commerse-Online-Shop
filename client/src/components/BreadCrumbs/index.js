import React, {Component} from "react";
import {NavLink} from "react-router-dom";


import "./BreadCrumbs.scss";

class BreadCrumbs extends Component {

    componentDidMount() {
        console.log("=========");
    }

    render() {

        // let a = this.props.navMenuItems.map(item =>{
        //     return (
        //         <li><NavLink to="/">{item.categoryName}</NavLink></li>
        //
        //     )
        // })

        // let paths = [];
        return (
            <section className="breadcrumbs-block">
                <div className="container">
                    <div className="breadcrumbs">
                        <div className="breadcrumbs-row">
                            <ul>
                                {/*{a}*/}
                                <li><NavLink to="/">home</NavLink></li>
                                <li><NavLink to="/">women</NavLink></li>
                                <li><NavLink to="/">women's clothing</NavLink></li>
                            </ul>
                        </div>

                        <div className="category-title-active">
                            <h2>Women's clothing</h2>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default BreadCrumbs;