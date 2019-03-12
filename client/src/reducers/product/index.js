import {
  SEND_PRODUCT_REQUEST,
  GET_PRODUCT_LISTING,
  SAVE_PRODUCT_DETAILS
} from "../../actions/product";

const initialState = {
  productListing: [],
  isProductListing: false,
  activeColor: ""
};

function product(state = initialState, action) {
  switch (action.type) {
    case SEND_PRODUCT_REQUEST:
      return {
        ...state,
        isProductListing: true
      };
    case SAVE_PRODUCT_DETAILS:
      return {
        ...state,
        activeColor: action.payload
      };
    case GET_PRODUCT_LISTING:
      return {
        ...state,
        // productListing: action.payload.productListing,
        productListing: action.payload,
        isProductListing: false
      };

    default:
      return { ...state };
  }
}

export default product;
