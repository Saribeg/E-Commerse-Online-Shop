import React, {Component} from 'react'
import {connect} from "react-redux";

class ProcessCheckout extends Component {


    render() {

        return (
            <>
                Checkout is finished
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCheckout)