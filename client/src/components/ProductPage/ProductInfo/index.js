// @flow
import * as React from "react";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";

type Props = {
  currentPrice: number,
  itemNo?: string
};

class ProductInfo extends React.Component<Props> {
  render() {
    const { itemNo, currentPrice, model, productFeatures, activeColor } = {
      ...this.props
    };
    const activeItem = productFeatures.filter(elem => {
      return activeColor === elem.colorName;
    })[0];

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
      </div>
    );
  }
}

export default ProductInfo;
