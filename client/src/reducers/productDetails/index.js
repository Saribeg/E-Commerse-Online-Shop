import {
	FETCH_PRODUCT_DETAIL_REQUEST, 
	FETCH_PRODUCT_DETAIL_SUCCEED,
	FETCH_PRODUCT_DETAIL_FAIL
} from "../../actions/productDetails";

const initialState = {
	productOpened: []
};

function productDetails(state = initialState, action) {
	switch (action.type) {
			case FETCH_PRODUCT_DETAIL_REQUEST:
					return {
							...state
					}
			case FETCH_PRODUCT_DETAIL_SUCCEED:
					return {
							...state,
						 productOpened: action.payload
					}
			default:
					return{...state}
	}
}

export default productDetails;