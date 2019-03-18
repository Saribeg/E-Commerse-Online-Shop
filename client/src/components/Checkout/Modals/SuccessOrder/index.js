import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import {CLOSE_MODAL_SUCCESS_ORDER} from "../../../../actions/cart";

import "./SuccessOrder.scss"


class SuccessOrder extends Component {

    render () {

        let modalSuccessOrder = (this.props.dataBasket.windows.successOrder) ? 'modal-success-order' : 'd-none';

        return (
            <div className={modalSuccessOrder}>
                <p className="modal-success-order-text">
                    Your order successfully placed in our store. Please keep calm and wait for our callback
                </p>

                <NavLink to="/">
                    <input type="button" onClick={this.props.closeSuccessOrder} value="Okay" className="modal-success-order-btn"/>
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

        closeSuccessOrder: () => {
            dispatch({type: CLOSE_MODAL_SUCCESS_ORDER})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessOrder)