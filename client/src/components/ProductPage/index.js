import React, { Component, Fragment } from 'react'
import axios from 'axios';
import PhotoGallery from './PhotoGallery';
import ProductInfo from './ProductInfo';
import { connect } from "react-redux";
import {getProductDetails} from "../../actions/productDetails"

class ProductPage extends Component {

	state = {
		productFeatures: [
			{
				color: 'black'
			}
		]
	}

	componentDidMount(){
	 	this.props.getProductDetails(this.props.match.params); 
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
    <ProductInfo colors={this.getColors()}/>
		</section>
)
}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getProductDetails: (data) => dispatch(getProductDetails(data))
	}
}

export default connect(null, mapDispatchToProps)(ProductPage);
