import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import {CLOSE_MODAL_SUCCESS_ORDER, CLOSE_MODAL_FINISH_ORDER_AFTER_LOGIN, sendCheckout} from "../../../../actions/cart";

// import "./SuccessOrder.scss"


class FinishAfterLogin extends Component {

    render () {

        let modalFinishAfterLogin = (this.props.dataBasket.windows.finishAfterLogin) ? 'modal-success-order' : 'd-none';

        return (
            <div className={modalFinishAfterLogin}>
                <p className="modal-success-order-text">
                    You are successfully log in.
                </p>

                <NavLink to="/">
                    <input type="button" onClick={this.props.setFinishedCart} value="Finish checkout" className="modal-success-order-btn"/>
                </NavLink>

                    <input type="button" onClick={this.props.finishAfterLogin} value="Back to payment" className="modal-success-order-btn"/>


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

        finishAfterLogin: () => {
            dispatch({type: CLOSE_MODAL_FINISH_ORDER_AFTER_LOGIN})
        },

        setFinishedCart: () => dispatch(sendCheckout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishAfterLogin)