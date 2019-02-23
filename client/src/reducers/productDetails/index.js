import {
	FETCH_PRODUCT_DETAIL_REQUEST, 
	FETCH_PRODUCT_DETAIL_SUCCEED,
	FETCH_PRODUCT_DETAIL_FAIL
} from "../../actions/types";

const initialState = {
	productsOpened: []
};

function productDetails(state = initialState, action) {
	switch (action.type) {
			case FETCH_PRODUCT_DETAIL_REQUEST:
					return {
							...state,
							productsOpened: action.payload
					}
			case FETCH_PRODUCT_DETAIL_SUCCEED:
					return {
							...state,
							productsOpened: action.payload
					}
			default:
					return{...state}
	}
}

export default productDetails;