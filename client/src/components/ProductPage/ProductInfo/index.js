// @flow
import * as React from 'react';
import ProductColors from './ProductColors';

class ProductInfo extends Component {
type Props = {
	currentPrice: number,
  itemNo?: string,
};

class ProductInfo extends React.Component<Props> {
	render() {
		const {itemNo, currentPrice, model, colors, activeColor} = {...this.props};

		return (
	<div className="product-main-info">
			<h2 className="product-title">{model}</h2>
			<span className="product-meta">Item No. {itemNo}</span>
			<p className="product-price">{currentPrice}</p>
 			<p className="product-filter"></p>
			<ProductColors colors={colors} activeColor={activeColor} changeColor={this.props.changeColor}/>
</div>
	)

	}
}


export default ProductInfo;
