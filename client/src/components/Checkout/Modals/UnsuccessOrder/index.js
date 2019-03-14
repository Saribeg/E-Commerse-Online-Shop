import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import {CLOSE_MODAL_SUCCESS_ORDER} from "../../../../actions/cart";

import "./UnsuccessOrder.scss"


class UnsuccessOrder extends Component {

    render () {

        let modalUnsuccessOrder = (this.props.dataBasket.windows.unsuccessOrder) ? 'modal-unsuccess-order' : 'd-none';

        return (
            <div className={modalUnsuccessOrder}>
                <p className="modal-unsuccess-order-title">
                    Your order successfully placed in our store. Please keep calm and wait for our callback
                </p>

                <NavLink to="/">
                    <input type="button" onClick={this.props.closeSuccessOrder} value="Okay" className="modal-unsuccess-order-btn"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UnsuccessOrder)