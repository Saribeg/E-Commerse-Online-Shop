// const pDebounce = require('p-debounce');

import React, {Component} from 'react'
import {connect} from "react-redux";

import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    CHANGE_AMOUT_OF_ITEM,
    CHANGE_ARRAY_AMOUT_OF_ITEM,
    DELETE_ITEM_TO_CART,
    checkAvailableItem
} from '../../actions/cart';

import './cart.scss'
import {goToProfile} from "../../actions/login";

const debounce = (fn, delay) => {
    let timer = null;
    return function (...args) {
        const context = this;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

class Cart extends Component {

    state = {
        isBlock: false,
        isRequest: false,
    }

    // constructor(props) {
    //     super(props);
    //     this.checkArrayAvailableItemsDebounce = debounce(this.props.checkArrayAvailableItems, 200);
    // }


    // checkArrayAvailableItems = (arrayCheckProducts) =>
    //     debounce(this.props.checkArrayAvailableItems(arrayCheckProducts), 500)  ;


    // checkArrayAvailableItemsDebounce = (arrayCheckProducts) => {
    //     this.props.checkArrayAvailableItems(arrayCheckProducts);
    //
    // }

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

        setTimeout(this.funcCheckAvailable, 500);

        this.setState({
            isRequest: false,
        });
    }

    addAmount = (index) => {


        let newAmount = this.state[index];
        newAmount++;

        if (!this.state.isBlock) {

            this.props.changeArrayAmount({
                ...this.state,
                [index]: newAmount
            });
            setTimeout(this.funcCheckAvailable, 500);
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
                setTimeout(this.funcCheckAvailable, 500);
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

    // checkAvailableItem = () => {
    //
    //
    // }

    // checkArrayAvailableItem = (array) => {
    //
    //     array.forEach((elem, index) => {
    //         this.props.checkAvailableItem(elem, index);
    //     })
    //
    //
    // }





    componentWillUpdate(nextProps, nextState) {

        console.log('component will update')
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

    funcCheckAvailable = () => {

        console.log('funcCheckAvailable')

        let arrayCheckProducts = [];

        if (this.props.dataBasket.arrayProduct.length > 0) {
            this.props.dataBasket.arrayProduct.forEach((elem, index) => {
                let checkItem = {
                    id: elem.id,
                    isAvailable: elem.isAvailable,
                    reasonNotAvailable: elem.reasonNotAvailable,
                    colorName: elem.colorName,
                    size: elem.size,
                    amount: elem.amount,
                    priceFormDB: elem.priceFormDB,
                }
                arrayCheckProducts.push(checkItem);
            })

            console.log('componentDidMount array', arrayCheckProducts)

            this.props.checkArrayAvailableItems(arrayCheckProducts);
        }
    }

    componentDidMount() {

        this.funcCheckAvailable();

        let obj = {}

        this.props.dataBasket.arrayProduct.forEach((elem, index) => {
            obj[index] = elem.amount;
        })
        this.setState({...obj})

        // this.setState({[index]: elem.amount})
    }

    render() {

        // let arrayCheckProducts = [{id: '5c62e45b9103d2041423d03f', isAvailable: true,
        //     reasonNotAvailable: '', colorName: 'black', size: 's', amount: 3,}];
        let arrayCheckProducts = [];

        console.log(this.state);

        let productList = this.props.dataBasket.arrayProduct.map((elem, index) => {

            console.log('start loop')

            let keyItem = index;
            let amount = this.state[keyItem];
            let checkItem = {
                id: elem.id,
                isAvailable: elem.isAvailable,
                reasonNotAvailable: elem.reasonNotAvailable,
                colorName: elem.colorName,
                size: elem.size,
                amount: elem.amount,
                priceFormDB: elem.priceFormDB,
            }
            arrayCheckProducts.push(checkItem);

            // console.log('this.props.checkAvailableItem(checkItem)')


            let classIsAvailable = elem.isAvailable ? 'basket-item-available' : 'd-none';
            let classIsNotAvailable = !elem.isAvailable ? 'basket-item-notavailable' : 'd-none';

            let classWasChangedPrice = (Number(elem.price) !== Number(elem.priceFormDB)) ? null : 'd-none';
            let classWasntChangedPrice = (Number(elem.price) === Number(elem.priceFormDB)) ? null : 'd-none';


            return (
                <li key={keyItem + "indexCart"} className="basket-item">
                    <span className="basket-item-delete" onClick={() => this.deleteItem(keyItem)}><FontAwesomeIcon
                        icon={faTimes}/></span>
                    <img
                        className="basket-item-img"
                        src={elem.urlPhoto}
                    />
                    <div className="basket-item-info">
                        <p className="basket-item-title">{elem.model}</p>
                        <p>{elem.colorName}</p>
                        <p>{elem.size}</p>
                        <p className={classIsAvailable}>
                            In Stock
                        </p>
                        <p className={classIsNotAvailable}>
                            Out Stock
                        </p>
                        <p className={classIsNotAvailable}>
                            {elem.reasonNotAvailable}
                        </p>
                    </div>
                    <div className="product-counter">
                        <button className="product-counter-btn" onClick={() => this.minusAmount(keyItem)}>-</button>
                        <input name={keyItem} type="text" className="product-counter-input-value" value={amount}
                               onChange={this.handleChange}/>
                        <button className="product-counter-btn" onClick={() => this.addAmount(keyItem)}>+</button>
                    </div>
                    <p className="basket-item-title">
                        <div className={classWasChangedPrice}>
                            <div className='basket-item-old-price'>
                                {elem.price}
                            </div>
                            <div className='basket-item-new-price'>
                                {elem.priceFormDB}
                            </div>
                        </div>

                        <div className={classWasntChangedPrice}>
                            {elem.price}
                        </div>


                    </p>
                </li>
            )

        })




        // if (arrayCheckProducts.length > 0) {
        //     this.props.checkArrayAvailableItems(arrayCheckProducts);
        // }

        // if (arrayCheckProducts.length > 0) {
        //     debounce(this.props.checkArrayAvailableItems(arrayCheckProducts), 1000);
        // }




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
        },

        // checkAvailableItem: (itemData, index) => dispatch(checkAvailableItem(itemData, index)),

        checkArrayAvailableItems: (arrData) => dispatch(checkAvailableItem(arrData))


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)