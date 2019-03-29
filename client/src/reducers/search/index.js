import {
  FETCH_SEARCH_REQUESTED,
  FETCH_SEARCH_SUCCEEDED,
  TYPE_SEARCH_VALUE,
  FOCUS_SEARCH_INPUT,
  BLUR_SEARCH_INPUT,
  CLEAR_SEARCH_INPUT,
  VALIDATE_SEARCH_VALUE,
  CLOSE_SEARCH_RESULTS
} from "../../actions/search";

const initialState = {
  focus: false,
  searchString: "",
  nonValid: false,
  closeResults: false,
  isSearchFetching: false,
  products: []
};

function search(state = initialState, action) {
  switch (action.type) {
    case TYPE_SEARCH_VALUE:
      return {
        ...state,
        searchString: action.payload
      };
    case FOCUS_SEARCH_INPUT:
      return {
        ...state,
        focus: true
      };
    case BLUR_SEARCH_INPUT:
      return {
        ...state,
        focus: false,
        nonValid: false
      };
    case VALIDATE_SEARCH_VALUE:
      return {
        ...state,
        nonValid: action.payload
      };
    case FETCH_SEARCH_REQUESTED:
      return {
        ...state,
        isSearchFetching: true
      };
    case FETCH_SEARCH_SUCCEEDED:
      return {
        ...state,
        isSearchFetching: false,
        closeResults: false,
        products: action.payload
      };
    case CLOSE_SEARCH_RESULTS:
      return {
        ...state,
        closeResults: true,
        searchString: "",
        products: []
      };
    case CLEAR_SEARCH_INPUT:
      return {
        ...state,
        searchString: ""
      };
    default:
      return { ...state };
  }
}

export default search;
