import axios from 'axios';
import store from "../store";

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const CHANGE_AMOUT_OF_ITEM = 'CHANGE_AMOUT_OF_ITEM';

export const SET_CART_FROM_LOCALSTORAGE = 'SET_CART_FROM_LOCALSTORAGE';

export const SET_ID_LOGGED_USER = 'SET_ID_LOGGED_USER';

export const SET_ID_CART_FROM_DB = 'SET_ID_CART_FROM_DB';

export const SET_DATA_CART_FROM_DB = 'SET_DATA_CART_FROM_DB';

export function getCart(userId) {

    axios.post('/getCart', userId)
        .then(res => res.data)
        .then(data => {

            console.log('data', data)

            let readyData = JSON.parse(data.infoDB);

            console.log('readyData', readyData)

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
