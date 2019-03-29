import {
  SEND_PRODUCT_REQUEST,
  GET_PRODUCT_LISTING,
  SEND_PRODUCT_POP_REQUEST,
  GET_PRODUCT_POP_LISTING,
  SAVE_PRODUCT_DETAILS
} from "../../actions/product";

const initialState = {
  productListing: [],
  productPopularListing: [],
  isProductListing: false,
  isProductPopularListing: false,
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
    case SEND_PRODUCT_POP_REQUEST:
      return {
        ...state,
        isProductPopularListing: true
      };
    case GET_PRODUCT_POP_LISTING:
      return {
        ...state,
        // productListing: action.payload.productListing,
        productPopularListing: action.payload,
        isProductPopularListing: false
      };

    default:
      return { ...state };
  }
}

export default product;
