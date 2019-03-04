import React, { Component, Fragment } from "react";
import "./photo-gallery.scss";

export default class PhotoGallery extends Component {
  state = {
    index: 0
  };

  render() {
    let productFeatures = this.props.productFeatures;
    let firstPhoto = null;
    let photoGallery = productFeatures.map(elem => {
      let active = this.props.activeColor === elem.colorName;
      if (active) {
        firstPhoto = elem.imageUrls[this.state.index];
        let array = elem.imageUrls;
        return elem.imageUrls.map(elem => {
          return (
            <img
              className={`all-photos-item`}
              src={elem}
              alt={this.props.activeColor}
              onClick={() => {
                this.setState({
                  index: array.indexOf(elem)
                });
              }}
            />
          );
        });
      }
    });

    let photoGalleryFiltered = photoGallery.filter(elem => {
      return elem !== undefined;
    })[0];

    return (
      <>
        <div className="all-photos">{photoGallery}</div>
        <div className="photo-main">
          {photoGalleryFiltered[this.state.index]}
        </div>
      </>
    );
  }
}
