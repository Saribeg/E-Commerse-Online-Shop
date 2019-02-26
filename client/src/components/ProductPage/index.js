import React, { Component, Fragment } from 'react'
import axios from 'axios';
import PhotoGallery from './PhotoGallery';
import ProductInfo from './ProductInfo';
import { connect } from "react-redux";
import {getProductDetails} from "../../actions/productDetails"

class ProductPage extends Component {

	state = {
		activeColor: this.props.activeColor,
		productFeatures: []
	}

	componentDidMount(){
		 this.props.getProductDetails(this.props.match.params);
	}

	changeColor = (color) =>{
			this.setState({activeColor: color})
	}
	
	setInitialState = () => {
		 const activeItem = this.props.productFeatures;
		 
	}

	render() {
		const {itemNo, currentPrice, model} = {...this.props.productItem.productOpened};
		const {productFeatures} = {...this.props};
		const activeColor = this.state.activeColor;

		console.log(this.state);
		return (
		<section className="product-main container">
	 	<PhotoGallery productFeatures ={productFeatures} activeColor={activeColor}/>
		<ProductInfo colors={productFeatures}
								 activeColor={activeColor}
								 itemNo={itemNo}
								 currentPrice={currentPrice}
								 model={model}
								 changeColor={this.changeColor}
								 />
		</section>
)
}
}

const mapStateToProps = (state) => {
	return {
		productItem: state.productDetails,
		productFeatures: state.productDetails.productOpened.productFeatures,
		activeColor: state.product.activeColor
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getProductDetails: (data) => dispatch(getProductDetails(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
