import axios from "axios";
export const SEND_PRODUCT_REQUEST = "SEND_PRODUCT_REQUEST";
export const GET_PRODUCT_LISTING = "GET_PRODUCT_LISTING";


export const getProductItem = () => dispatch =>{
    console.log('=============== 1 ================');
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