import React, { Component, Fragment } from "react";
import MainPhoto from './MainPhoto';
import "./photo-gallery.scss";

export default class PhotoGallery extends Component {
  state = {
    activePhotoSrc: "",
  };

  setMainPhoto = (url) => {
      this.setState({
        activePhotoSrc: url,
      });
    }

  render() {
    let productFeatures = this.props.productFeatures;
    let firstPhotoSrc = null;
    
    let photoGallery = productFeatures.map(elem => {
      let active = this.props.activeColor === elem.colorName;
      if (active) {
         firstPhotoSrc = elem.imageUrls[0];
        return elem.imageUrls.map(elem => {
          return (
            <img
						  key={elem._id}
              className={`all-photos-item`}
              src={elem}
              alt={this.props.activeColor}
              onClick={() => {             
               this.setMainPhoto(elem);             
              }}
            />           
          );
        });
      }
    });
    if(this.state.activePhotoSrc === "" || this.state.activePhotoSrc !== firstPhotoSrc){
      this.setMainPhoto(firstPhotoSrc);
    }
   
   
    return (
      <Fragment>
        <div className="all-photos">{photoGallery}</div>
        <MainPhoto activePhotoSrc={this.state.activePhotoSrc}/>
      </Fragment>
    );
  }
}
