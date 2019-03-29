import axios from "axios";
export const FETCH_CATEGORY_CAROUSEL_REQUESTED = "FETCH_CATEGORY_CAROUSEL_REQUESTED";
export const FETCH_CATEGORY_CAROUSEL_SUCCEEDED = "FETCH_CATEGORY_CAROUSEL_SUCCEEDED";


export const getCategoryItem = () => dispatch =>{
    dispatch({
        type: FETCH_CATEGORY_CAROUSEL_REQUESTED
    });

    axios.get("/categoryCarousels").then(categoriesList => {
        dispatch({
            type: FETCH_CATEGORY_CAROUSEL_SUCCEEDED,
            payload: categoriesList.data
        })
    })
};