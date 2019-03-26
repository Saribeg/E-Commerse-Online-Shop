import React, {Component} from 'react'
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import {sendCheckout} from "../../../actions/cart";


class PlaceOrder extends Component {
    render() {

        let arrayCheckout = [];
        let price = 0;
        if (this.props.dataBasket.arrayProduct.length > 0) {
            this.props.dataBasket.arrayProduct.forEach((elem) => {
                if (elem.isAvailable === true) {
                    price += elem.priceFormDB * elem.amount;
                    arrayCheckout.push(
                        <li>
                            <span className="title">{`${elem.model} x ${elem.amount}`}</span><span
                            className="price">{`$${(elem.priceFormDB * elem.amount).toFixed(2)}`}</span>
                        </li>)


                }

            });

        }

        let deliveryPrice = 0;
        this.props.dataBasket.deliveryMethods.forEach((elem) => {
            if (elem.name === this.props.dataBasket.checkedDelivery) {
                deliveryPrice = elem.price;
            }
        })

        let totalPrice = price + deliveryPrice;
        price = price.toFixed(2);
        totalPrice = totalPrice.toFixed(2);

        return (
            <div className="basket-final-order">
                <h3 className="basket-final-order-title">My order</h3>
                <ul className="basket-final-order-info">
                    <li>
                        <span className="title">Price</span><span className="price">{`$${price}`}</span>
                    </li>
                    <li>
                        <span className="title">Delivery</span><span className="price">{`$${deliveryPrice}`}</span>
                    </li>
                    <li>
                        <span className="title">Total</span><span className="price">{`$${totalPrice}`}</span>
                    </li>
                </ul>
                <NavLink  to="/checkout">
                    <input className="btn-add-to-cart" type="button" value="Place your order" disabled={!this.props.enableBtn} onClick={this.props.setFinishedCart}/>
                </NavLink>

            </div>
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
        setFinishedCart: () => dispatch(sendCheckout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder)