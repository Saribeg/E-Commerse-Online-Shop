import React, {Component} from "react";
import {connect} from "react-redux";
import {getCategoryItem} from "../../actions/categoryCarousel";
import {NavLink} from "react-router-dom";
import Preloader from "../Preloader";
import "./CategoryCarousel.scss";

class CategoryCarousel extends Component {
    componentDidMount() {
        this.props.getCategoryItem();
    }

    render() {
        let listCategories = this.props.categoriesList.map(item => {
            return (
                <div key={item._id}>
                    <NavLink key={item._id} to={item.categoryUrl} className="category-item">
                        <img src={item.categoryImg} alt={item.categoryName} className="category-img"/>
                        <div className="category-name">{item.categoryName}</div>
                        <div className="category-link">shop now</div>
                    </NavLink>
                </div>
            )
        })
        return (
            <>
                <section className="shop-category">
                    <div className="container">
                        <h2 className="category-title">Most popular categories</h2>
                        <div className="category-listing">
                            {this.props.isCategoriesFetching ? <Preloader/> : listCategories}
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        categoriesList: state.categoryCarousel.categoriesList,
        isCategoriesFetching: state.categoryCarousel.isCategoriesFetching
    }
}

export default connect(mapStateToProps, {getCategoryItem})(CategoryCarousel);