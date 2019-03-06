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



export function checkAvailableItem(arrData) {
    // console.log('action arrItemData', arrItemData)

    return dispatch => {

        // console.log('hi axios')


        axios.post('/checkAvailableItem', {arrData: arrData})
            .then(res => res.data)
            .then(data => {

                setTimeout(dispatch({type: CHANGE_CHECK_AMOUT_OF_ITEM, payload: {newArr: data.updatedArray}}), 500)



                // if (data.wasUpdated) {
                //     console.log('---------- was updated')
                //     dispatch({type: UPDATE_STORE_AFTER_CHECK_IN_DB, payload: {newArr: data.updatedArray}})
                // }
                // else {
                //     console.log('---------- wasnt updated')
                // }

                }
            )
            .catch(err => {
            })

    }
}


// export function checkAvailableItem(itemData, index) {
//     // console.log('action arrItemData', arrItemData)
//
//     return dispatch => {
//         axios.post('/checkAvailableItem', {itemData: itemData, index: index})
//             .then(res => res.data)
//             .then(data => {
//
//                     // dispatch({type: CLOSE_LOGIN_DETAILS})
//                 }
//             )
//             .catch(err => {
//                 // dispatch({type: CLOSE_LOGIN_DETAILS});
//
//                 // history.push("/login")
//                 // window.location.href = "/login";
//             })
//
//     }
// }

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
        // .then(res => res.data)
        // .then(data => {
        //
        //         if (data.success) {
        //             // store.dispatch({type: SET_ID_CART_FROM_DB, payload: {idCartInDB: data.idCartInDB}})
        //         }
        //     }
        // )
        .catch(err => console.log(err))

}
