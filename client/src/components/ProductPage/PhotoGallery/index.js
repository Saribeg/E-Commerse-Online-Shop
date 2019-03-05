import React, { Component} from "react";
import "./photo-gallery.scss";

export default class PhotoGallery extends Component {
  state = {
    index: 0
  };

  render() {
    let productFeatures = this.props.productFeatures;
    let photoGallery = productFeatures.map(elem => {
      let active = this.props.activeColor === elem.colorName;
      if (active) {
        let array = elem.imageUrls;
        return elem.imageUrls.map(elem => {
          return (
            <div className={`all-photos-item`}> 
            <img
              
              src={elem}
              alt={this.props.activeColor}
              onClick={() => {
                this.setState({
                  index: array.indexOf(elem)
                });
              }}
            /></div>
          );
        });
      }
    });

    let photoGalleryFiltered = photoGallery.filter(elem => {
      return elem !== undefined;
    })[0];

    let mainPhoto = (photoGalleryFiltered) ? photoGalleryFiltered[this.state.index] : null;

    return (
      <>
        <div className="all-photos">{photoGallery}</div>
        <div className="photo-main">
            {mainPhoto}
        </div>
      </>
    );
  }
}
