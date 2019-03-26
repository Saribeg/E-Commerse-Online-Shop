import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import {CLOSE_MODAL_SUCCESS_ORDER} from "../../../../actions/cart";

import "./SuccessOrder.scss"


class SuccessOrder extends Component {

    render () {

        let modalSuccessOrder = (this.props.dataBasket.windows.successOrder) ? 'modal-success-order' : 'd-none';
        let modalSuccessBackdrop = modalSuccessOrder === 'modal-success-order' ? 'modal-backdrop' : null;
        return (
            <div className={modalSuccessBackdrop}>
            <div className={modalSuccessOrder}>
                <p className="modal-success-order-text">
                    Your order was successfully placed in our store.
                </p>
                <p className="modal-success-order-text">
                    Details of your order was sent to your email
                </p>

                <p className="modal-success-order-text-number">
                   ORDER ID: {this.props.dataBasket.orderNo}
                </p>
                <NavLink to="/">
                    <input type="button" onClick={this.props.closeSuccessOrder} value="Ok" className="modal-success-order-btn"/>
                </NavLink>

            </div>
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

        closeSuccessOrder: () => {
            dispatch({type: CLOSE_MODAL_SUCCESS_ORDER})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessOrder)