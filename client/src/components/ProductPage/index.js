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


	render() {
		const {itemNo, currentPrice, model} = {...this.props.productItem.productOpened};
				console.log(this.state);
		return (
		<section className="product-main container">
		<PhotoGallery />
		<ProductInfo colors={this.props.colors}
								 itemNo={itemNo}
								 currentPrice={currentPrice}
								 model={model}/>
		</section>
)
}
}

const mapStateToProps = (state) => {
	return {
		productItem: state.productDetails,
		colors: state.productDetails.productOpened.productFeatures
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getProductDetails: (data) => dispatch(getProductDetails(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
