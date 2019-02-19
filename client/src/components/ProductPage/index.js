import React, { Component } from 'react'

export default class ProductPage extends Component {
	render() {
		const {item} = this.props.item;
		const colors = item.colors.map((elem) => {
				return <li class="color-item red active"></li>
		})
		return (
			<div className="product-main-info">
				<h2 className="product-title">Drape Neck Dress.</h2>
	<span className="product-meta">Item No. 25697212</span>
	<p className="product-price">SGD 139.90 </p>
	<p className="product-filter">Color</p>

	<ul className="product-colors">{colors}
	</ul>
			</div>
		)
	}
}
