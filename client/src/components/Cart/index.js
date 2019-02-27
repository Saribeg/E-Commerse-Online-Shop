import React, {Component} from 'react'
import {connect} from "react-redux";

import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {CHANGE_AMOUT_OF_ITEM} from '../../actions/cart';

import './cart.scss'

class Cart extends Component {

    state = {}

    handleChange = (event) => {
        let name = event.target.name;
        let value = Number(event.target.value);
        console.log(value)
        if (!isNaN(value)) {
            this.props.changeAmount(name, value);
            this.setState({[name]: value});
        }
    }

    plusCount = (index) => {
        // console.log(value)

        let newAmount = this.state[index];
        newAmount++;
        this.props.changeAmount(index, newAmount);
        this.setState({[index]: newAmount});

    }

    minusCount = (index) => {
        // console.log(value)
        let newAmount = this.state[index];

        if (newAmount - 1 >= 0) {
            newAmount--;
            this.props.changeAmount(index, newAmount);
            this.setState({[index]: newAmount});
        }

    }

    componentDidMount() {
        this.props.dataBasket.arrayProduct.forEach((elem, index) => {
            this.setState({[index]: elem.amount})
        })
    }

    render() {
        let productList = this.props.dataBasket.arrayProduct.map((elem, index) => {

            let keyItem = index;
            let amount = '';
            amount = this.state[keyItem]

            return (
                <li className="basket-item">
                    <span className="basket-item-delete"><FontAwesomeIcon icon={faTimes}/></span>
                    <img
                        className="basket-item-img"
                        src={elem.urlPhoto}
                    />
                    <div className="basket-item-info">
                        <p className="basket-item-title">{elem.model}</p>
                        <p>{elem.colorName}</p>
                        <p>{elem.size}</p>
                    </div>
                    <div className="product-counter">
                        <button className="product-counter-btn" onClick={() => this.minusCount(keyItem)}>-</button>
                        <input name={keyItem} type="text" className="product-counter-input-value" value={amount}
                               onChange={this.handleChange}/>
                        <button className="product-counter-btn" onClick={() => this.plusCount(keyItem)}>+</button>
                    </div>
                    <p className="basket-item-title">{elem.price}</p>
                </li>
            )

        })


        return (
            <section className="basket-page container">
                <ul className="basket-items-list">
                    {productList}
                </ul>

                <div className="basket-final-order">
                    <h3 className="basket-final-order-title">My order</h3>
                    <ul className="basket-final-order-info">
                        <li>
                            <span className="title">Total</span><span className="price">$65.99</span>
                        </li>
                        <li>
                            <span className="title">Доставка</span><span className="price">Free</span>
                        </li>
                    </ul>
                    <a href="#" className="btn-add-to-cart">Checkout</a>
                </div>
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
    return {
        changeAmount: (index, value) => {
            dispatch({type: CHANGE_AMOUT_OF_ITEM, payload: {index: index, value}})
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)