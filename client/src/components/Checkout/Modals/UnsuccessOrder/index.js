import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import FormLogin from "../../../atomic/FormLogin";

import FormCheckoutByEmail from "./FormCheckoutByEmail"

import {checkLoginBeforeCheckout} from "../../../../actions/login";
import {CLOSE_MODAL_UNSUCCESS_ORDER, sendOrderByEmail} from "../../../../actions/cart";

import "./UnsuccessOrder.scss"


class UnsuccessOrder extends Component {

    handleSubmitLogin = (values) => {

        let sendLogin = {
            email: values.email,
            password: values.password
        };

        console.log('handleSubmitLogin')
        this.props.checkLoginBeforeCheckout(sendLogin);

    }

    handleSubmitEmail = (values) => {


        let sendObj = {
            ...this.props.dataBasket,
            userMail: values.email
        }

        console.log('handleSubmitEmail')
        this.props.sendOrderByEmail(sendObj);

    }

    render () {

        // let modalUnsuccessOrder = (this.props.dataBasket.windows.unsuccessOrder) ? 'modal-unsuccess-order' : 'd-none';

        let modalUnsuccessOrderFailLogin = (this.props.dataBasket.windows.invalidLogin) ? null : 'd-none';

        return (
            <div className="modal-unsuccess-order">
                <div data-btn="btn-login-checkout-up-close" className="login-cancel-btn"  />
                <p className="modal-unsuccess-order-title">
                    You are not logged. Please enter your login and password or your e-mail to proceed checkout
                </p>

                <p className={modalUnsuccessOrderFailLogin}>
                    Incorrect login. Try again
                </p>

                <FormLogin onSubmit={this.handleSubmitLogin}/>

                <FormCheckoutByEmail onSubmit={this.handleSubmitEmail}/>

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

        closeUnsuccessOrder: () => {
            dispatch({type: CLOSE_MODAL_UNSUCCESS_ORDER})
        },

        checkLoginBeforeCheckout: (loginForm) => dispatch(checkLoginBeforeCheckout(loginForm)),

        sendOrderByEmail: (loginForm) => dispatch(sendOrderByEmail(loginForm)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnsuccessOrder)