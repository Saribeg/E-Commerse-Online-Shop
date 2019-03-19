import React, {Component, Fragment} from "react";

import {connect} from "react-redux";
import {ADD_ITEM_TO_CART} from "../../../actions/cart";

import "./btn-add-to-cart.scss";

class BtnAddToCart extends Component {




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


    }


    render() {
        return (
            <Fragment>
                <input type="button" value="Add to cart" className="btn-add-to-cart" onClick={() => this.sendToCart()} />
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
