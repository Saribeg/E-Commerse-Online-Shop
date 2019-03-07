import React, {Component} from 'react'
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';

import PlaceOrder from "./PlaceOrder"
import FormDeliveryCheckout from "./FormDeliveryCheckout"

import './Checkout.scss'
import {DELETE_ITEM_TO_CART, CHANGE_DELIVERY_METHOD} from "../../actions/cart";

class Checkout extends Component {



    render() {

        let arrayProducts = [];

        arrayProducts = this.props.dataBasket.arrayProduct.map((elem) => {
            if (elem.isAvailable) {

                return (
                    <li className="checkout-product-item">
                        <img src={elem.urlPhoto} alt="" className="checkout-product-item-img"/>
                        <div className="checkout-product-item-block">
                            <div className="checkout-product-item-details">
                                <div className="checkout-product-item-description">
                                    <p className="checkout-product-item-model">
                                        {elem.model}
                                    </p>
                                    <p className="checkout-product-item-color">
                                        {`Color - ${elem.colorName}`}
                                    </p>
                                    <p className="checkout-product-item-size">
                                        {`Size - ${elem.size}`}
                                    </p>
                                </div>
                            </div>
                            <div className="checkout-product-item-price">
                                <p>{`${elem.priceFormDB} x ${elem.amount}`}</p>
                                <p className="checkout-product-item-price-bold">
                                    {`$${(elem.amount * elem.priceFormDB).toFixed(2)}`}
                                </p>
                            </div>

                        </div>
                    </li>
                )

            }


        })


        let arrayDelivery = this.props.dataBasket.deliveryMethods.map((elem) => {

            return (
                <li key={elem.name}>
                    <input
                        className="delivery-input"
                        type="radio"
                        name="deliveryFilter"
                        value={elem.name}
                        checked={elem.name === this.props.dataBasket.checkedDelivery}
                        id={elem.name}
                        onChange={() => this.props.handleDeliveryRadio(elem.name)}
                    />
                    <label
                        className="delivery-link"
                        title={elem.name}
                        htmlFor={elem.name}
                    >
                        <div className="delivery-link-block">
                            <p>
                                Delivery - {elem.name}
                            </p>
                            <p>
                                Estimated delivery - {elem.duration} days
                            </p>
                            <p>
                                Price - {elem.price}
                            </p>
                        </div>

                    </label>
                </li>
            )

        })


        return (
            <section className="basket-page container">
                <div className="checkout">
                    <ul className="checkout-product-list">
                        {arrayProducts}
                    </ul>

                    <div className="checkout-delivery-method">
                        Choose one of delivery method
                        <ul className="checkout-delivery-list">
                            {arrayDelivery}
                        </ul>


                    </div>

                    <div className="checkout-delivery-details">
                        Please enter your address
                        <FormDeliveryCheckout />
                    </div>

                    <div className="checkout-payment">
                        Please enter your payment information
                    </div>
                </div>

                <PlaceOrder/>


            </section>


        )
    }

}

const mapStateToProps = state => {
    return {
        dataBasket: state.cart,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    handleDeliveryRadio: (radio) => {
        dispatch({type: CHANGE_DELIVERY_METHOD, payload: {method: radio}})
    },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)