import axios from "axios";
import {SET_INITIAL_STATE_ADD_CART} from "./addToCart";

export const FETCH_PRODUCT_DETAIL_REQUEST = "FETCH_PRODUCT_DETAIL_REQUEST";
export const FETCH_PRODUCT_DETAIL_SUCCEED = "FETCH_PRODUCT_DETAIL_SUCCEED";
export const FETCH_PRODUCT_DETAIL_FAIL = "FETCH_PRODUCT_DETAIL_FAIL";

export const getProductDetails = routeDetails => dispatch => {
    dispatch({
        type: FETCH_PRODUCT_DETAIL_REQUEST
    });

    const {category, subCategory, furtherSubCategory, id} = routeDetails;

    axios
        .get(`/products/${category}/${subCategory}/${furtherSubCategory}/${id}`, {
            params: {
                id: id
            }
        })
        .then(result => {

            let data = {
                id: result.data[0]._id,
                isAvailable: true,
                reasonNotAvailable: "",
                model: result.data[0].model,
                amount: 1,
                price: result.data[0].currentPrice,
                priceFormDB: result.data[0].currentPrice,
            }

            dispatch({
                type: SET_INITIAL_STATE_ADD_CART,
                payload: {data: data}
            });

            dispatch({
                type: FETCH_PRODUCT_DETAIL_SUCCEED,
                payload: result.data[0]
            });
        });
};
