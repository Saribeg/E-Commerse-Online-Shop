// @flow
import * as React from "react";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";
import BtnAddToCart from "../../atomic/BtnAddToCart";

type Props = {
  currentPrice: number,
  itemNo?: string
};

class ProductInfo extends React.Component<Props> {
  render() {
    const { itemNo, currentPrice, model, productFeatures, activeColor } = {
      ...this.props
    };

    return (
      <div className="product-main-info">
        <h2 className="product-title">{model}</h2>
        <span className="product-meta">Item No. {itemNo}</span>
        <p className="product-price">{currentPrice}</p>
        <p className="product-filter" />
        <ProductColors
          colors={productFeatures}
          activeColor={activeColor}
          changeColor={this.props.changeColor}
        />
        <ProductSizes
          activeColor={activeColor}
          productFeatures={productFeatures}
        />
        <BtnAddToCart />
      </div>
    );
  }
}

export default ProductInfo;
