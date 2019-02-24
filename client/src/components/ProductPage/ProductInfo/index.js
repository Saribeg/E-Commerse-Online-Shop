import React, { Component } from 'react';
import ProductColors from './ProductColors';

class ProductInfo extends Component {
	render() {
		const {itemNo, currentPrice, model} = {...this.props};
		
		return (			
	<div className="product-main-info">
			<h2 className="product-title">{model}</h2>
			<span className="product-meta">Item No. {itemNo}</span>
			<p className="product-price">{currentPrice}</p>
 			<p className="product-filter"></p>
			<ProductColors colors={this.props.colors} /> 
</div>
	)
	
	}
}


export default ProductInfo;
