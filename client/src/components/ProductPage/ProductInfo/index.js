import React, { Component } from 'react'

export default class ProductInfo extends Component {
	render() {
		const {itemNo, currentPrice, model, colors} = {...this.props};
		
		return (			
	<div className="product-main-info">
			<h2 className="product-title">{model}</h2>
			<span className="product-meta">Item No. {itemNo}</span>
			<p className="product-price">{currentPrice}</p>
 			<p className="product-filter"></p>
			<ul className="product-colors">{colors}</ul>
</div>
	)
	
	}
}

const mapStateToProps = state => {
  return {
    model: state.productsOpened.model,
    itemNo: state.productsOpened.itemNo,
    currentPrice: state.productsOpened.currentPrice,
    currentOnMouseOverCategory: state.navMenu.currentOnMouseOverCategory
  };
};
