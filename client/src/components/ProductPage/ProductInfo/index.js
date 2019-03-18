// @flow
import * as React from "react";
import {Helmet} from "react-helmet";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";
import BtnAddToCart from "../../atomic/BtnAddToCart";
import './product-info.scss';

type Props = {
  currentPrice: number,
  itemNo: string,
  activeColor: string,
  model: string,
  productFeatures: Array<Object>,
  changeColor: Function
};

class ProductInfo extends React.Component<Props> {

 /*  state = {
    id: '5c62e83e12c9d12dbc9ecf16',
    isAvailable: true,
    reasonNotAvailable: '',
    model: 'Light Spring Hat',
    colorName: 'white',
    size: 'm',
    amount: 1,
    price: 28.88,
    priceFormDB: 28.88,
    urlPhoto: "/img/products/women/accessories/hats/001/ffffff/011.png"
  } */
  
  render() {
    const { itemNo, currentPrice, model, productFeatures, activeColor } = {
      ...this.props
    };

/*     saveChosenItem () => {
       
    } */

    return (
      <>
      <Helmet>
			<title>{model}</title>
      <link rel="shortcut icon" type="image/x-icon"  href="./favicon-matter.ico"/>  
			</Helmet>
      <div className="product-main-info">
        <h2 className="product-title">{model}</h2>
        <span className="product-meta">Item Id. {itemNo}</span>
        <p className="product-price">${currentPrice}</p>
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
      </>
    );
  }
}

export default ProductInfo;
