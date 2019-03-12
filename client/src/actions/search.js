import axios from "axios";

export const FETCH_SEARCH_REQUESTED = "FETCH_SEARCH_REQUESTED";
export const FETCH_SEARCH_SUCCEEDED = "FETCH_SEARCH_SUCCEEDED";
export const FETCH_SEARCH_FAILED = "FETCH_SEARCH_FAILED";
export const TYPE_SEARCH_VALUE = "TYPE_SEARCH_VALUE";
export const FOCUS_SEARCH_INPUT = "FOCUS_SEARCH_INPUT";
export const BLUR_SEARCH_INPUT = "BLUR_SEARCH_INPUT";
export const CLOSE_SEARCH_RESULTS = "BLUR_SEARCH_INPUT";
export const VALIDATE_SEARCH_VALUE = "VALIDATE_SEARCH_VALUE";

// Handling situations when search input is focused (to change input width)
export const focusSearchInput = () => dispatch => {
  dispatch({
    type: FOCUS_SEARCH_INPUT
  });
};

// Handling situations when search input is blured (to change input width)
export const blurSearchInput = () => dispatch => {
  dispatch({
    type: BLUR_SEARCH_INPUT
  });
};

// Handling situations when search input is filling by unallowed characters (to show error)
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

export const closeSearchResults = e => dispatch => {
  dispatch({
    type: CLOSE_SEARCH_RESULTS
  });
};

//Showing preloader while async request is going on
export const searchStart = () => {
  return {
    type: FETCH_SEARCH_REQUESTED
  };
};

//Showing error if async request finished by error
export const searchFail = () => {
  return {
    type: FETCH_SEARCH_FAILED
  };
};

//Showing results when async request is finished successfully
export const searchSuccess = data => {
  return {
    type: FETCH_SEARCH_SUCCEEDED,
    payload: data
  };
};

// This function makes search requests.
// If the previous request is not finished when current request
// is called this function calcells the previous one.
function makeRequestCreator() {
  let call;

  return value => dispatch => {
    dispatch({
      type: TYPE_SEARCH_VALUE,
      payload: value
    });
    if (call) {
      call.cancel();
    }
    dispatch(searchStart());
    call = axios.CancelToken.source();
    return axios
      .post(
        "/search/search-products",
        { query: value },
        {
          cancelToken: call.token
        }
      )
      .then(response => {
        dispatch(searchSuccess(response.data));
      })
      .catch(thrown => {
        // dispatch(searchFail());
        if (axios.isCancel(thrown)) {
          console.log("request is canceled", thrown);
        } else {
          console.log(thrown);
        }
      });
  };
}

export const search = makeRequestCreator();
