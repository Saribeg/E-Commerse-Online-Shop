import React, {Component} from "react";
import PhotoGallery from "./PhotoGallery";
import ProductInfo from "./ProductInfo";
import {connect} from "react-redux";
import {getProductDetails} from "../../actions/productDetails";
import BreadCrumbs from "../BreadCrumbs";

class ProductPage extends Component {
    state = {
        activeColor: this.props.activeColor,
        productFeatures: [
            {
                color: "",
                sizes: []
            }
        ]
    };

    componentDidMount() {
        this.props.getProductDetails(this.props.match.params);
    }

    changeColor = color => {
        this.setState({activeColor: color});
    };

    setInitialColor = array => {
        return array[0].colorName;
    };

    setInitialState = () => {
        const activeItem = this.props.productFeatures;
    };

    render() {
        const {itemNo, currentPrice, model} = {
            ...this.props.productItem.productOpened
        };
        const {productFeatures} = {...this.props};
        let activeColor = this.state.activeColor;

        if (activeColor == "") {
            activeColor = this.setInitialColor(productFeatures);
        }

        return (
            <>
                <BreadCrumbs categoryAway={this.props.match.params} modelName={model} activeColor={activeColor}/>

                <section className="product-main container">
                    <PhotoGallery
                        productFeatures={productFeatures}
                        activeColor={activeColor}
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
        getProductDetails: data => dispatch(getProductDetails(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductPage);
