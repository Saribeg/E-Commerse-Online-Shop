import React, { Component, Fragment } from 'react'
import './photo-gallery.scss'

export default class PhotoGallery extends Component {
	
	render() {
	 let productFeatures = this.props.productFeatures;
	 let photoGallery = productFeatures.map((elem) => {
		return elem.imageUrls.map((elem) => {
			return (<img class="all-photos-item" src={elem} alt="pants" />)
		 })
	 });
 	 let mainPhoto = photoGallery[0][0]; 

		return (
			<Fragment>
			
			<div className="all-photos">
			  {photoGallery}
			</div>
			<div className="photo-main">
		 	{mainPhoto} 
			</div>
			</ Fragment>
		)
	}		
}
	

