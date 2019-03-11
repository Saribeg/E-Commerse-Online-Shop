import axios from "axios";
import { searchRequest } from "../utils/requestCanceller";

export const FETCH_SEARCH_REQUESTED = "FETCH_SEARCH_REQUESTED";
export const FETCH_SEARCH_SUCCEEDED = "FETCH_SEARCH_SUCCEEDED";
export const FETCH_SEARCH_FAILED = "FETCH_SEARCH_FAILED";
export const TYPE_SEARCH_VALUE = "TYPE_SEARCH_VALUE";
export const FOCUS_SEARCH_INPUT = "FOCUS_SEARCH_INPUT";
export const BLUR_SEARCH_INPUT = "BLUR_SEARCH_INPUT";
export const VALIDATE_SEARCH_VALUE = "VALIDATE_SEARCH_VALUE";

export const focusSearchInput = () => dispatch => {
  dispatch({
    type: FOCUS_SEARCH_INPUT
  });
};

export const blurSearchInput = () => dispatch => {
  dispatch({
    type: BLUR_SEARCH_INPUT
  });
};

export const validateSearchValue = e => dispatch => {
  const re = /[0-9a-zA-Z- ]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
    dispatch({
      type: VALIDATE_SEARCH_VALUE,
      payload: true
    });
  } else {
    dispatch({
      type: VALIDATE_SEARCH_VALUE,
      payload: false
    });
  }
};

export const typeSearchValue = value => dispatch => {
  dispatch({
    type: TYPE_SEARCH_VALUE,
    payload: value
  });

  dispatch({
    type: FETCH_SEARCH_REQUESTED
  });

  axios
    .post("/search/search-products", {
      query: value
    })
    .then(products => {
      let newProducts = JSON.parse(JSON.stringify(products.data));
      dispatch({
        type: FETCH_SEARCH_SUCCEEDED,
        payload: newProducts
      });
    })
    .catch(err => console.log(err));
};
