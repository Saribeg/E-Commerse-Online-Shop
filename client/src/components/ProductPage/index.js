import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';

export default class ProductPage extends Component {
/* 	this.propTypes = {
		withdrawnFromSale: 
	} */


	componentDidMount() {
		const {category, subCategory, furtherSubCategory, id} = this.props.match.params
			axios.get(`/products/${category}/${subCategory}/${furtherSubCategory}/${id}`, {
				params: {
					category: category,
					subCategory: subCategory,
					furtherSubCategory: furtherSubCategory,
					id: id,					
				}
			}).then((result) =>{
					this.setState(result.data[0]);
					console.log(this.state);
			})
	}
	render() {
			const {itemNo, currentPrice, model} = {...this.state};
			const {productFeatures} = {...this.state};
			console.log(productFeatures);
         const colors = productFeatures.map((elem) => {
				return <li className="color-item red active">{elem.color}</li>
		})      
		return (
			<div className="product-main-info">
				<h2 className="product-title">{model}</h2>
	<span className="product-meta">Item No. {itemNo}</span>
	<p className="product-price">{currentPrice}</p>
{/* 	<p className="product-filter">{colors}</p> */}

	<ul className="product-colors">
	</ul>
			</div>
		)
	}
}
