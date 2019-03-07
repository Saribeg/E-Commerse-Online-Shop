import React, {Component} from 'react'
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';

import PlaceOrder from "./PlaceOrder"


class Checkout extends Component {


    render() {

        return (
            <section className="basket-page container">
                <div>
                    <ul className="basket-items-list">
                        There will be checkout
                    </ul>
                </div>

                <PlaceOrder />


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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)