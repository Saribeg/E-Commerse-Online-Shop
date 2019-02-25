import React, {Component} from 'react'
import {connect} from "react-redux";
import {CLOSE_REG_FORM} from "../../actions/login";
import {ADD_ITEM_TO_CART} from '../../actions/cart';


class TestAddToCart extends Component {

    addToCart = (obj) => {
        this.props.addProductToCart(obj);
    }

    render() {

        let prod = [
            {
                id: '5c62e45b9103d2041423d03e',
                isAvailable: true,
                reasonNotAvailable: '',
                category: 'women',
                subCategory: 'clothing',
                furtherSubCategory: 'dresses',
                model: 'Mega Sexy Dress',
                colorName: 'blue',
                size: 's',
                amount: 3,
                price: 229.99,
                priceFormDB: 229.99,
                urlPhoto: "/img/products/women/clothing/pants/002/53a5e4/021.png"
            },
            {
                id: '5c62e45b9103d2041423d03e',
                isAvailable: true,
                reasonNotAvailable: '',
                category: 'women',
                subCategory: 'clothing',
                furtherSubCategory: 'dresses',
                model: 'Mega Sexy Dress',
                colorName: 'blue',
                size: 'xs',
                amount: 1,
                price: 229.99,
                priceFormDB: 229.99,
                urlPhoto: "/img/products/women/clothing/pants/002/53a5e4/021.png"
            },
            {
                id: '5c62e83e12c9d12dbc9ecf16',
                isAvailable: true,
                reasonNotAvailable: '',
                category: 'women',
                subCategory: 'accessories',
                furtherSubCategory: 'hats',
                model: 'Light Spring Hat',
                colorName: 'white',
                size: 'm',
                amount: 1,
                price: 28.88,
                priceFormDB: 28.88,
                urlPhoto: "/img/products/women/accessories/hats/001/ffffff/011.png"
            },
            {
                id: '5c62e142a4b7e11ba0cc9936',
                isAvailable: true,
                reasonNotAvailable: '',
                category: 'women',
                subCategory: 'clothing',
                furtherSubCategory: 'dresses',
                model: 'Bennie Scuba Dress',
                colorName: 'black',
                size: 'xs',
                amount: 2,
                price: 159.95,
                priceFormDB: 159.95,
                urlPhoto: "/img/products/women/clothing/dresses/006/000000/040.jpg"
            },
            {
                id: '5c62e142a4b7e11ba0cc9936',
                isAvailable: true,
                reasonNotAvailable: '',
                category: 'women',
                subCategory: 'clothing',
                furtherSubCategory: 'dresses',
                model: 'Bennie Scuba Dress',
                colorName: 'blue',
                size: 's',
                amount: 2,
                price: 159.95,
                priceFormDB: 159.95,
                urlPhoto: "/img/products/women/clothing/dresses/006/53a5e4/010.jpg"
            }


        ];

        let arrProd = prod.map((elem) => {

            return (
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img style={{height: '200px'}} src={elem.urlPhoto} alt=""/>
                    <div>
                        <p>model - {elem.model}</p>
                        <p>Size - {elem.size}</p>
                        <p>Color - {elem.color}</p>
                        <p>Amount - {elem.amount}</p>
                        <input type="button" value="add to Cart" onClick={() => this.addToCart(elem)}/>
                    </div>

                </div>
            )


        });


        return (
            <>

                {arrProd}

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
    return {
        addProductToCart: (item) => {
            dispatch({type: ADD_ITEM_TO_CART, payload: {item: item}})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestAddToCart)