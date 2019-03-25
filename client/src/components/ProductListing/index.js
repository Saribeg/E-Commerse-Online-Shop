import React, {Component} from "react";
import {connect} from "react-redux";
import {getProductPopular} from "../../actions/product";
import "./ProductListing.scss";
import ProductCard from "../ProductCard";


class ProductListing extends Component {
    componentDidMount() {
        this.props.getProductPopular();
    }

    render() {

        let counterItems = 0;
        let listProduct = [];
        if (this.props.productPopularListing) {
            listProduct = this.props.productPopularListing.map(productItem => {

                return productItem.productFeatures.map(productFeatures => {
                    counterItems++;

                    if (counterItems <= this.props.children)
                        return (
                            <ProductCard
                                productUrl={productItem.productUrl}
                                key={productItem._id}
                                imageUrl={productFeatures.imageUrls[0]}
                                model={productItem.model}
                                colorName={productFeatures.colorName}
                                currentPrice={productItem.currentPrice}
                                previousPrice={productItem.previousPrice}
                                currentFilters={productItem}
                            />
                        )
                })
            })
        }

        return (
            <div className="listing-products">
                {this.props.isProductPopularListing ? <div>Loading...</div> : listProduct}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productPopularListing: state.product.productPopularListing,
        isProductPopularListing: state.product.isProductPopularListing
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getProductItem: () => dispatch(getProductItem()),
        getProductPopular: () => dispatch(getProductPopular()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
