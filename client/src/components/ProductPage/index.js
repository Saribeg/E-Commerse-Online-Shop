import React, {Component} from "react";
import PhotoGallery from "./PhotoGallery";
import ProductInfo from "./ProductInfo";
import {connect} from "react-redux";
import {getProductDetails} from "../../actions/productDetails";
import {SET_COLOR} from "../../actions/addToCart";

import BreadCrumbs from "../BreadCrumbs";
import './product-page.scss';

class ProductPage extends Component {
    state = {
        activeColor: this.props.activeColor,
        productFeatures: [
            {
                color: "",
                sizes: []
            }
        ],
        thumbs: true
    };

    componentDidMount() {
        this.props.getProductDetails(this.props.match.params);
    }

    changeColor = color => {

        this.props.setColorAddCart(color);

        this.setState({activeColor: color,
        thumbs: false});
    };

    setInitialColor = array => {
        this.props.setColorAddCart(array[0].colorName);
        return array[0].colorName;
    };

    render() {
        const {itemNo, currentPrice, model} = {
            ...this.props.productItem.productOpened
        };
        const {productFeatures} = {...this.props};
        let activeColor = this.state.activeColor;

        if (activeColor === "") {
            activeColor = this.setInitialColor(productFeatures);
        }



        return (
            <>
                <BreadCrumbs categoryAway={this.props.match.params} modelName={model} activeColor={activeColor}/>

                <section className="product-main container">
                    <PhotoGallery
                        productFeatures={productFeatures}
                        activeColor={activeColor}
                        thumbs={this.props.thumbs}
                        changeColor={this.changeColor}
                    />
                    <ProductInfo
                        productFeatures={productFeatures}
                        activeColor={activeColor}
                        itemNo={itemNo}
                        currentPrice={currentPrice}
                        model={model}
                        changeColor={this.changeColor}
                    />
                  
                </section>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        productItem: state.productDetails,
        productFeatures: state.productDetails.productOpened.productFeatures,
        activeColor: state.product.activeColor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProductDetails: data => dispatch(getProductDetails(data)),
        // setInitialAddCart: (data) => {dispatch({type: SET_INITIAL_STATE, payload: {data: data}})}
        setColorAddCart: (color) => {dispatch({type: SET_COLOR, payload: {color: color}})}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductPage);
