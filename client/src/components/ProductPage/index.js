import React, { Component, Fragment } from 'react'
import axios from 'axios';
import PhotoGallery from './PhotoGallery';
import ProductInfo from './ProductInfo';
import PropTypes from 'prop-types';

export default class ProductPage extends Component {

	state = {
		productFeatures: [
			{
				color: 'black'
			}
		]
	}


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

    getColors = () => {
			const {productFeatures} = {...this.state};
			console.log(productFeatures);
			const colors = productFeatures.map((elem) => {
				return(
				<li className="color-item" style={{backgroundColor: elem.color}}></li>
			)
			})
			return colors;

	}
	render() {
			const {itemNo, currentPrice, model} = {...this.state};
	    
		return (
		<section className="product-main container">
		<PhotoGallery />
    <ProductInfo itemNo={itemNo} currentPrice={ currentPrice} model={model} colors={this.getColors()}/>
		</section>
)
}
}
