import React, {Component} from 'react'
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';


class PlaceOrder extends Component {
    render() {


        return (
            <div className="basket-final-order">
                <h3 className="basket-final-order-title">My order</h3>
                <ul className="basket-final-order-info">
                    <li>
                        <span className="title">Total</span><span className="price">{`$1111`}</span>
                    </li>
                    <li>
                        <span className="title">Delivery</span><span className="price">Free</span>
                    </li>
                </ul>
                <NavLink  to="/checkout">
                    <input className="btn-add-to-cart" type="button" value="Place your order" disabled={!this.props.enableBtn}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder)