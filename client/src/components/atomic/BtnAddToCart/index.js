import React, {Component, Fragment} from "react";

import {connect} from "react-redux";
import {ADD_ITEM_TO_CART} from "../../../actions/cart";

import "./btn-add-to-cart.scss";

class BtnAddToCart extends Component {

    state = {
        clickStatus: false
    };

    sendToCart = () => {

        let isExist = 0;

        this.props.cart.forEach((elem) => {

            if (elem.id === this.props.infoCart.id && elem.colorName === this.props.infoCart.colorName
                && elem.size === this.props.infoCart.size) {
                isExist = 1;
            }

        })

        if (!isExist) {
            this.props.addProductToCart(this.props.infoCart);
        }

        this.setState({clickStatus: true});
        setTimeout(() => {
            this.setState({clickStatus: false})
        }, 2000)
    }


    render() {
        let clickStatusText;
        if (this.state.clickStatus === true) {
            clickStatusText = 'Product has been added'
        } else {
            clickStatusText = ''
        }

        return (
            <Fragment>
                <input type="button" value="Add to cart" className="btn-add-to-cart" onClick={() => this.sendToCart()} />
                <p className="click-status-text">{clickStatusText}</p>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        infoCart: state.addToCart,
        cart: state.cart.arrayProduct
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addProductToCart: (item) => {
            dispatch({type: ADD_ITEM_TO_CART, payload: {item: item}})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnAddToCart)
