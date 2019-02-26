import React, { Component, Fragment } from 'react'
import './photo-gallery.scss'

export default class PhotoGallery extends Component {
	
	render() {
	 let productFeatures = this.props.productFeatures;
/* 	 let photoGallery = productFeatures.filter((elem) => {
		 return this.props.activeColor === elem.colorName
	 }).map((elem) => {
		return elem.imageUrls.map((elem) => {
			return (<img class="all-photos-item" src={elem} alt="pants" />)
		 })
	 })
  */

   let mainPhoto = null;
 	 let photoGallery = productFeatures.map((elem) => {
	 let active =  this.props.activeColor === elem.colorName ? 'd-flex' : '';
	  if(active){
			mainPhoto = <img src={elem.imageUrls[0]} alt="pants" /> 
		} 
		return elem.imageUrls.map((elem) => {
			return (<img className={`${active} all-photos-item`} src={elem} alt="pants" />)
		 })
	 });
 	   

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
	

