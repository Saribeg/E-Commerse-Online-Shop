import React, {Component} from 'react'
import {connect} from "react-redux";

import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {CHANGE_AMOUT_OF_ITEM, CHANGE_ARRAY_AMOUT_OF_ITEM, DELETE_ITEM_TO_CART} from '../../actions/cart';

import './cart.scss'

class Cart extends Component {

    state = {
        isBlock: false,
        isRequest: false,
    }

    handleChange = (event) => {

        console.log('handleChange')

        let name = event.target.name;
        let value = Number(event.target.value);
        if (!isNaN(value)) {
            this.props.changeAmount(name, value);
            this.setState({[name]: value});
        }
    }

    falseBlock = () => {

        console.log('call false block')

        this.setState({
            isBlock: false,
        });
    }

    falseRequest = () => {
        console.log('call request false')
        this.props.changeArrayAmount({
            ...this.state,
        });

        this.setState({
            isRequest: false,
        });
    }

    addAmount = (index) => {
        // console.log("addamount")

        // let newAmount = this.state[index];
        // newAmount++;
        // this.props.changeAmount(index, newAmount);
        // this.setState({[index]: newAmount});

        let newAmount = this.state[index];
        newAmount++;

        if (!this.state.isBlock) {

            this.props.changeArrayAmount({
                ...this.state,
                [index]: newAmount
            });
            setTimeout(this.falseBlock, 2000);
            this.setState({
                isBlock: true,
                [index]: newAmount
            });
        } else {

            if (!this.state.isRequest) {
                setTimeout(this.falseRequest, 2000);
                this.setState({
                    isRequest: true,
                    [index]: newAmount
                });
            } else {
                this.setState({
                    [index]: newAmount
                });
            }

        }

    }

    minusAmount = (index) => {
        // console.log(value)
        let newAmount = this.state[index];

        if (newAmount - 1 >= 0) {
            newAmount--;
            if (!this.state.isBlock) {

                this.props.changeArrayAmount({
                    ...this.state,
                    [index]: newAmount
                });
                setTimeout(this.falseBlock, 2000);
                this.setState({
                    isBlock: true,
                    [index]: newAmount
                });
            } else {

                if (!this.state.isRequest) {
                    setTimeout(this.falseRequest, 2000);
                    this.setState({
                        isRequest: true,
                        [index]: newAmount
                    });
                } else {
                    this.setState({
                        [index]: newAmount
                    });
                }

            }
        }

    }

    deleteItem = (index) => {
        let arr = this.props.dataBasket.arrayProduct;
        arr.splice(index, 1);

        this.props.deleteItem(arr);

        arr.forEach((elem, index) => {
            this.setState({[index]: elem.amount})
        })


    }

    componentWillUpdate(nextProps, nextState) {
        let isUpdate = 0;
        let obj = {}
        nextProps.dataBasket.arrayProduct.forEach((elem, index) => {
            if (!this.state[index]) {
                obj[index] = elem.amount;
                isUpdate = 1;
            }
        })
        if (isUpdate) {
            this.setState({...obj})
        }

    }


    componentDidMount() {

        let obj = {}

        this.props.dataBasket.arrayProduct.forEach((elem, index) => {
            obj[index] = elem.amount;
        })
        this.setState({...obj})

        // this.setState({[index]: elem.amount})
    }

    render() {

        let productList = this.props.dataBasket.arrayProduct.map((elem, index) => {

            let keyItem = index;
            let amount = '';
            amount = this.state[keyItem];

            return (
                <li key={keyItem + "indexCart"} className="basket-item">
                    <span className="basket-item-delete" onClick={() => this.deleteItem(keyItem)}><FontAwesomeIcon icon={faTimes}/></span>
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
                        <button className="product-counter-btn" onClick={() => this.minusAmount(keyItem)}>-</button>
                        <input name={keyItem} type="text" className="product-counter-input-value" value={amount}
                               onChange={this.handleChange}/>
                        <button className="product-counter-btn" onClick={() => this.addAmount(keyItem)}>+</button>
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
        },

        changeArrayAmount: (obj) => {
            dispatch({type: CHANGE_ARRAY_AMOUT_OF_ITEM, payload: {obj: obj}})
        },

        deleteItem: (array) => {
            dispatch({type: DELETE_ITEM_TO_CART, payload: {array: array}})
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)