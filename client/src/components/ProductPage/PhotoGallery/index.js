import React, {Component} from "react";
import {connect} from "react-redux";
import {SET_COLOR, SET_IMG} from "../../../actions/addToCart";

import "./photo-gallery.scss";


class PhotoGallery extends Component {
    state = {
        index: 0
    };

    // componentDidMount() {
    //
    //     console.log('componentDidMount GALLERY');
    //     console.log(this.props.activeColor)
    //
    //     this.props.setColorAddCart(this.props.activeColor);
    //
    // }

    componentDidUpdate(prevProps, prevState) {

        let urlPhoto = '';
        this.props.productFeatures.forEach((elem => {

            if (this.props.activeColor === elem.colorName) {
                urlPhoto = elem.imageUrls[0];
            }

        }));

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

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        // setInitialAddCart: (data) => {dispatch({type: SET_INITIAL_STATE, payload: {data: data}})}
        setColorAddCart: (color) => {
            dispatch({type: SET_COLOR, payload: {color: color}})
        },

        setUrlAddCart: (url) => {
            dispatch({type: SET_IMG, payload: {url: url}})
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhotoGallery);
