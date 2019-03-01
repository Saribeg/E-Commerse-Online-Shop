import React, { Component, Fragment } from "react";
import "./photo-gallery.scss";

export default class PhotoGallery extends Component {
  state = {
		activePhotoSrc: "",
		activeColor: this.props.activeColor
  };

  changeMainPhoto = url => {
    if (url) {
      this.setState({
				activePhotoSrc: url
      });
    }
  };
  render() {
    let productFeatures = this.props.productFeatures;
    let firstPhoto = null;

    let mainPhoto = <img src={this.state.activePhotoSrc} alt="img" />;

    let photoGallery = productFeatures.map(elem => {
      let active = this.props.activeColor === elem.colorName;
      if (active) {
        firstPhoto = elem.imageUrls[0];
        return elem.imageUrls.map(elem => {
          return (
            <img
						  key={elem._id}
              className={`all-photos-item`}
              src={elem}
              alt={this.state.activeColor}
              onClick={() => this.changeMainPhoto(elem)}
            />
          );
        });
      }
    });
    if (this.state.activePhotoSrc === "") {
      this.changeMainPhoto(firstPhoto);
    }

    return (
      <Fragment>
        <div className="all-photos">{photoGallery}</div>
        <div className="photo-main">{mainPhoto}</div>
      </Fragment>
    );
  }
}
