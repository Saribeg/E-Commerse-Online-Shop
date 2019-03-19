import {
  FETCH_FILTER_REQUESTED,
  FETCH_FILTER_SUCCEEDED,
  FETCH_FILTER_FAILED,
  FETCH_PRODUCT_REQUESTED,
  FETCH_PRODUCT_SUCCEEDED,
  FETCH_PRODUCT_FAILED,
  SELECT_FILTERS,
  SELECT_SIZE,
  SELECT_PRICE
} from "../../actions/filterActions";

const initialState = {
  isFilterFetching: false,
  isProductFetching: false,
  colorFilters: [],
  sizeFilters: [],
  sizeOptions: [],
  currentSizeOption: null,
  products: [],
  selected: {
    price: { min: 5, max: 1000 }
  }
};

function filters(state = initialState, action) {
  switch (action.type) {
    case FETCH_FILTER_REQUESTED:
      return {
        ...state,
        isFilterFetching: true
      };
    case FETCH_FILTER_SUCCEEDED:
      return {
        ...state,
        colorFilters: action.colors,
        sizeFilters: action.filters,
        sizeOptions: action.sizeOptions,
        isFilterFetching: false
      };
    case FETCH_PRODUCT_REQUESTED:
      return {
        ...state,
        isProductFetching: true
      };
    case FETCH_PRODUCT_SUCCEEDED:
      return {
        ...state,
        products: action.payload,
        isProductFetching: false
      };
    case SELECT_FILTERS:
      return {
        ...state,
        selected: action.payload
      };
    case SELECT_SIZE:
      return {
        ...state,
        currentSizeOption: action.payload
      };
    case SELECT_PRICE:
      return {
        ...state,
        selected: {
          ...state.selected,
          price: action.payload
        }
      };
    default:
      return { ...state };
  }
}

export default filters;
