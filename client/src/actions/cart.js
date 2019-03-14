import axios from 'axios';
import store from "../store";
import {CLOSE_LOGIN_DETAILS} from "./login";

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const DELETE_ITEM_TO_CART = 'DELETE_ITEM_TO_CART';
export const CHANGE_AMOUT_OF_ITEM = 'CHANGE_AMOUT_OF_ITEM';
export const CHANGE_ARRAY_AMOUT_OF_ITEM = 'CHANGE_ARRAY_AMOUT_OF_ITEM';

export const SET_CART_FROM_LOCALSTORAGE = 'SET_CART_FROM_LOCALSTORAGE';

export const CART_FROM_LOCALSTORAGE_TO_DB = 'CART_FROM_LOCALSTORAGE_TO_DB';

export const SET_ID_LOGGED_USER = 'SET_ID_LOGGED_USER';

export const SET_ID_CART_FROM_DB = 'SET_ID_CART_FROM_DB';

export const SET_DATA_CART_FROM_DB = 'SET_DATA_CART_FROM_DB';

export const CLEAR_CART_ON_LOGOUT = 'CLEAR_CART_ON_LOGOUT';

export const UPDATE_STORE_AFTER_CHECK_IN_DB = 'UPDATE_STORE_AFTER_CHECK_IN_DB';

export const CHANGE_CHECK_AMOUT_OF_ITEM = 'CHANGE_CHECK_AMOUT_OF_ITEM';

export const CHANGE_DELIVERY_METHOD = 'CHANGE_DELIVERY_METHOD';

export const SET_FINISHED_CART = 'SET_FINISHED_CART';
export const SET_DEFAULT_FINISHED_CART = 'SET_DEFAULT_FINISHED_CART';

export const OPEN_MODAL_SUCCESS_ORDER = 'OPEN_MODAL_SUCCESS_ORDER';
export const CLOSE_MODAL_SUCCESS_ORDER = 'CLOSE_MODAL_SUCCESS_ORDER';


export const OPEN_MODAL_UNSUCCESS_ORDER = 'OPEN_MODAL_UNSUCCESS_ORDER';
export const CLOSE_MODAL_UNSUCCESS_ORDER = 'CLOSE_MODAL_UNSUCCESS_ORDER';

export function sendCheckout() {

    return dispatch => {

        axios.get('/users/checkout')
            .then(() => {
                    console.log('ISSSS logged');
                    dispatch({type: SET_FINISHED_CART});
                    dispatch({type: OPEN_MODAL_SUCCESS_ORDER});


                }
            )
            .catch(err => {
                console.log('ISNTTT logged')
            })

    }
}

export function updateCartIsFinished(dataCart) {

    axios.post('/updateCartIsFinished', dataCart)
        .then(res => res.data)
        .then(data => {
                store.dispatch({type: SET_DEFAULT_FINISHED_CART});
            }
        )
        .catch(err => console.log(err))

}

export function sendOrder(dataOrder) {

    let mail = dataOrder.userMail;

    // let textOrder = `<ul class="checkout-product-list">`;
    //
    // dataOrder.arrayProduct.forEach((elem) => {
    //     textOrder += `
    //                 <li class="checkout-product-item">
    //                     <img src=${elem.urlPhoto} alt="" class="checkout-product-item-img"/>
    //                     <div class="checkout-product-item-block">
    //                         <div class="checkout-product-item-details">
    //                             <div class="checkout-product-item-description">
    //                                 <p class="checkout-product-item-model">
    //                                     ${elem.model}
    //                                 </p>
    //                                 <p class="checkout-product-item-color">
    //                                     Color - ${elem.colorName}
    //                                 </p>
    //                                 <p class="checkout-product-item-size">
    //                                     Size - ${elem.size}
    //                                 </p>
    //                             </div>
    //                         </div>
    //                         <div class="checkout-product-item-price">
    //                             <p>${elem.priceFormDB} x ${elem.amount}</p>
    //                             <p class="checkout-product-item-price-bold">
    //                                 $${(elem.amount * elem.priceFormDB).toFixed(2)}
    //                             </p>
    //                         </div>
    //
    //                     </div>
    //                 </li>
    //     `
    // });
    //
    // textOrder += `</ul>`

    let textOrder = `<ul style="margin: 5px; border: 1px solid #eee;">`;

    dataOrder.arrayProduct.forEach((elem) => {
        textOrder += `
                    <li style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                        <div style="width: calc(100% - 110px);">
                            <div>
                                <div>
                                    <p style="font-weight: 600; font-size: 20px; margin-bottom: 10px; margin-top: 15px;">
                                        ${elem.model}
                                    </p>
                                    <p style="text-transform: uppercase; margin-bottom: 10px;">
                                        Color - ${elem.colorName}
                                    </p>
                                    <p style="text-transform: uppercase; margin-bottom: 20px;">
                                        Size - ${elem.size}
                                    </p>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;
                            border-top: 1px solid #eee; margin-right: 30px; padding-top: 10px; padding-bottom: 10px;">
                                <p>${elem.priceFormDB} x ${elem.amount}</p>
                                <p style="font-weight: 600;">
                                    $${(elem.amount * elem.priceFormDB).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </li>
        `
    });

    textOrder += `</ul>`;


    axios.post('/sendOrder', {mail: mail, textOrder: textOrder})
        .then(res => res.data)
        .then(data => {
                // store.dispatch({type: SET_DEFAULT_FINISHED_CART});
            }
        )
        .catch(err => console.log(err))

}


export function checkAvailableItem(arrData) {

    return dispatch => {

        // console.log('hi axios')


        axios.post('/checkAvailableItem', {arrData: arrData})
            .then(res => res.data)
            .then(data => {

                    setTimeout(dispatch({type: CHANGE_CHECK_AMOUT_OF_ITEM, payload: {newArr: data.updatedArray}}), 500)

                }
            )
            .catch(err => {
            })

    }
}


export function getCart(userId) {


    axios.post('/getCart', userId)
        .then(res => res.data)
        .then(data => {
                let readyData = JSON.parse(data.infoDB);

                if (data.success) {
                    store.dispatch({type: SET_DATA_CART_FROM_DB, payload: {infoDB: readyData}})
                }
            }
        )
        .catch(err => console.log(err))
}


export function addNewCart(dataCart) {

    axios.post('/addCart', dataCart)
        .then(res => res.data)
        .then(data => {

                if (data.success) {
                    store.dispatch({type: SET_ID_CART_FROM_DB, payload: {idCartInDB: data.idCartInDB}})
                }
            }
        )
        .catch(err => console.log(err))

}


export function updateCart(dataCart) {

    axios.post('/updateCart', dataCart)
        .then(res => res.data)
        .then(data => {
                console.log(data.success)
            }
        )
        .catch(err => console.log(err))

}
