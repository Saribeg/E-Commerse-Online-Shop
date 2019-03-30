import React, { Component } from "react";
import PhotoGallery from "./PhotoGallery";
import ProductInfo from "./ProductInfo";
import { connect } from "react-redux";
import { getProductDetails } from "../../actions/productDetails";
import { SET_COLOR, SET_IMG } from "../../actions/addToCart";

import BreadCrumbs from "../BreadCrumbs";
import SearchDropDownList from "../SearchDropDownList";
import ScrollBtn from "../ScrollBtn";

import "./product-page.scss";

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

    // console.log('this.state.activeColor', this.state.activeColor)

    if (this.state.activeColor) {
      let urlPhoto = "";

      this.props.productFeatures.forEach(elem => {
        if (this.state.activeColor === elem.colorName) {
          urlPhoto = elem.imageUrls[0];
        }
      });
      this.props.setUrlAddCart(urlPhoto);
      this.props.setColorAddCart(this.state.activeColor);
    }
  }

  changeColor = color => {
    let urlPhoto = "";

    this.props.productFeatures.forEach(elem => {
      if (color === elem.colorName) {
        urlPhoto = elem.imageUrls[0];
      }
    });

    this.props.setUrlAddCart(urlPhoto);
    this.props.setColorAddCart(color);

    this.setState({ activeColor: color, thumbs: false });
  };

  setInitialColor = array => {
    return array[0].colorName;
  };

  render() {
    const { itemNo, currentPrice, previousPrice, model } = {
      ...this.props.productItem.productOpened
    };
    const { productFeatures } = { ...this.props };
    let activeColor = this.state.activeColor;

    if (activeColor === "") {
      activeColor = this.setInitialColor(productFeatures);
    }

    return (
      <>
        <ScrollBtn scrollStepInPx="100" delayInMs="12"/>

        <SearchDropDownList />
        <BreadCrumbs
          categoryAway={this.props.match.params}
          modelName={model}
          activeColor={activeColor}
          itemNo={itemNo}
        />

        <section className="product-detail container">
          {/*<div className="product-main">*/}
          <PhotoGallery
            productFeatures={productFeatures}
            activeColor={activeColor}
            thumbs={this.props.thumbs}
            changeColor={this.changeColor}
          />
          {/*</div>*/}
          <ProductInfo
            productFeatures={productFeatures}
            activeColor={activeColor}
            itemNo={itemNo}
            currentPrice={currentPrice}
            previousPrice={previousPrice}
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
    setColorAddCart: color => {
      dispatch({ type: SET_COLOR, payload: { color: color } });
    },
    setUrlAddCart: url => {
      dispatch({ type: SET_IMG, payload: { url: url } });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
