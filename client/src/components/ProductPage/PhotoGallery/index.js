import React, { Component } from "react";
import { connect } from "react-redux";
import { SET_COLOR, SET_IMG } from "../../../actions/addToCart";
import ReactImageMagnify from "react-image-magnify";

import "./photo-gallery.scss";

class PhotoGallery extends Component {
  state = {
    index: 0
  };

  componentDidUpdate(prevProps, prevState) {
    let urlPhoto = "";
    this.props.productFeatures.forEach(elem => {
      if (this.props.activeColor === elem.colorName) {
        urlPhoto = elem.imageUrls[0];
      }
    });

    this.props.setColorAddCart(this.props.activeColor);
    this.props.setUrlAddCart(urlPhoto);
  }

  render() {
    let productFeatures = this.props.productFeatures;
    let photoGallery = productFeatures.map(elem => {
      let active = this.props.activeColor === elem.colorName;
      if (active) {
        let array = elem.imageUrls;
        return elem.imageUrls.map(elem => {
          return (
            <div className={`all-photos-item`} key={elem}>
              <img
                src={elem}
                alt={this.props.activeColor}
                onClick={() => {
                  this.setState({
                    index: array.indexOf(elem)
                  });
                }}
              />
            </div>
          );
        });
      }
    });

    let photoGalleryFiltered = photoGallery.filter(elem => {
      return elem !== undefined;
    })[0];

    let mainPhotoObj = photoGalleryFiltered
      ? photoGalleryFiltered[this.state.index]
      : null;
    let mainPhotoSrc = mainPhotoObj ? mainPhotoObj.key : null;

    return (
      <>
        <div className="product-main">
        <div className="all-photos">{photoGallery}</div>
        <div className="photo-main">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "item",
                isFluidWidth: true,
                src: mainPhotoSrc
              },
              largeImage: {
                src: mainPhotoSrc,
                width: 1200,
                height: 1800
              }
            }}
          />
        </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setColorAddCart: color => {
      dispatch({ type: SET_COLOR, payload: { color: color } });
    },

    setUrlAddCart: url => {
      dispatch({ type: SET_IMG, payload: { url: url } });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGallery);
