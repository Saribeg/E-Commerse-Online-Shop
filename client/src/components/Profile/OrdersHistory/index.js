import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from "axios";

import "./order-history.scss"


class OrdersHistory extends Component {

    state = {
        arrOrders: []
    }

    // componentDidMount () {
    //
    //     if (this.props.idUser) {
    //         axios.post("/getOrders", {idUser: this.props.idUser})
    //             .then(res => res.data)
    //             .then(data => {
    //             if (data.success) {
    //                 this.setState({
    //                     arrOrders: data.data
    //                 });
    //             }
    //         });
    //     }
    // }

    componentDidUpdate() {

        if (this.props.idUser) {
            axios.post("/getOrders", {idUser: this.props.idUser})
                .then(res => res.data)
                .then(data => {
                    if (data.success) {
                        this.setState({
                            arrOrders: data.data
                        });
                    }
                });
        }
    }

    render() {

        let arrMonths = ['January', "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]

        let arrOrders = this.state.arrOrders.map((elem) => {

            let dateOrder = new Date(elem.date)

            let dd = dateOrder.getDate();
            if (dd < 10) dd = '0' + dd;

            let mm = dateOrder.getMonth();
            mm = arrMonths[mm];

            let yy = dateOrder.getFullYear();

            let listProducts = elem.arrayProduct.map((item) => {

                return (
                    <li className="order-history-list-item">
                        <div className="checkout-product-item-description">
                            <p className="checkout-product-item-model">
                                {item.model}
                            </p>
                            <p className="checkout-product-item-color">
                                {`Color - ${item.colorName}`}
                            </p>
                            <p className="checkout-product-item-size">
                                {`Size - ${item.size}`}
                            </p>


                            <div className="checkout-product-item-price">
                                <p>{`${item.priceFormDB} x ${item.amount}`}</p>
                                <p className="checkout-product-item-price-bold">
                                    {`$${(item.amount * item.priceFormDB).toFixed(2)}`}
                                </p>
                            </div>

                        </div>
                    </li>
                )
            })

            return (
                <li className="order-history-item order-history-item-dark">
                    <p className="order-history-title">
                        Your order - {elem.orderNo}
                    </p>
                    <p className="order-history-date">
                        Date of order - {`${dd} ${mm} ${yy}`}
                    </p>

                    <ul className="order-history-list">
                        {listProducts}
                    </ul>
                </li>
            )
        });

        return (
            <ul className="section-order-history">
                {arrOrders}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        idUser: state.login.loggedData._id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersHistory)