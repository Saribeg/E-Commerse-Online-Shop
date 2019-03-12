import axios from "axios";
import {SET_COLOR} from "../actions/addToCart";
export const SEND_PRODUCT_REQUEST = "SEND_PRODUCT_REQUEST";
export const GET_PRODUCT_LISTING = "GET_PRODUCT_LISTING";
export const SAVE_PRODUCT_DETAILS = "SAVE_PRODUCT_DETAILS";



export const getProductItem = () => dispatch =>{
    dispatch({
        type: SEND_PRODUCT_REQUEST
    });

    axios.get("/products").then(productListing => {
        dispatch({
            type: GET_PRODUCT_LISTING,
            payload: productListing.data
        })
    })
};

export const saveProductDetails = (data) => dispatch =>{
    // console.log(data);

    dispatch({
        type: SET_COLOR,
        payload: {color: data}
    });

    dispatch({
        type: SAVE_PRODUCT_DETAILS,
        payload: data
    });
};

