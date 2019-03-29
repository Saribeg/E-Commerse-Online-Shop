import React, {Component} from 'react'
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import './final-order.scss';


class FinalOrder extends Component {
    render() {

        let arrayCheckout = [];
        let totalPrice = 0;
        if (this.props.dataBasket.arrayProduct.length > 0) {
            this.props.dataBasket.arrayProduct.forEach((elem) => {
                if (elem.isAvailable === true) {
                    totalPrice += elem.priceFormDB * elem.amount;
                    arrayCheckout.push(
                        <li key={elem.model}>
                            <span className="title">{`${elem.model} x ${elem.amount}`}</span><span
                            className="price">{`$${(elem.priceFormDB * elem.amount).toFixed(2)}`}</span>
                        </li>)


                }

            });
            totalPrice = totalPrice.toFixed(2);

        }


        return (
            <div className="basket-final-order">
                <h3 className="basket-final-order-title">My order</h3>
                <ul className="basket-final-order-info">
                    {arrayCheckout}
                    <li>
                        <span className="title">Total</span><span className="price">{`$${totalPrice}`}</span>
                    </li>
                    <li>
                        <span className="title">Delivery</span><span className="price">Free</span>
                    </li>
                </ul>

                <NavLink to="/checkout">

                    <input className="btn-add-to-cart" type="button" value="Proceed checkout" disabled={(this.props.dataBasket.arrayProduct.length === 0)}/>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalOrder)