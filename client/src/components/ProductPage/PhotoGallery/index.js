import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom'; 
import "./photo-gallery.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";

export default class PhotoGallery extends Component {
  state = {
    thumbnails: this.props.thumbs
  }

   renderGallery = () => {
    let productFeatures = this.props.productFeatures;
    let photoGallery = productFeatures.map(elem => {
    let active = this.props.activeColor === elem.colorName;    
      if (active) {
        return elem.imageUrls.map(elem => {            
            return (<img
              className={``}
              src={elem}
              alt={this.props.activeColor}          
            />)
       
        });
      }
    });
    let photoGalleryFiltered = photoGallery.filter((elem) => { 
      return elem !== undefined
    })[0]; 

    
    return photoGalleryFiltered;
  };

  render() {

   
    let carousel =
    <Carousel
    className="product-details-carousel"
     showThumbs={this.state.thumbnails}
     showArrows={false}
    
     onChange={()=> {this.renderGallery(); }}
    // emulateTouch = {true}
    showIndicators={false}
    infiniteLoop={true}
    showStatus={false}
    activeColor={this.props.activeColor}
>
 {this.renderGallery()}
   
{/*       { photoGallery.map((elem) => {
        return (<img
          className={``}
          src={elem}
          alt={this.props.activeColor}          
        />)
    })} */}
</Carousel> 


    


    return (
      <Fragment>
        {carousel}
         
       {/*  <div className="all-photos">{photoGallery}</div> */}
      </Fragment>
    );
  }
}
	

