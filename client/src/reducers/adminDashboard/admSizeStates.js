import {
  GET_NEW_SIZE_NAME,
  FETCH_NEW_SIZE_REQUESTED,
  FETCH_NEW_SIZE_SUCCEEDED,
  FETCH_NEW_SIZE_FAILED,
  GET_NUPDATED_SIZE_NAME,
  FETCH_EXISTING_SIZE_REQUESTED,
  FETCH_EXISTING_SIZE_SUCCEEDED,
  FETCH_EXISTING_SIZE_FAILED,
  FETCH_UPDATING_SIZE_REQUESTED,
  FETCH_UPDATING_SIZE_SUCCEEDED,
  FETCH_UPDATING_SIZE_FAILED
} from "../../actions/adminDashboard/admSizeActions";

const initialState = {
  newSizeName: "",
  isNewSizeFetching: false,
  checkNewSizeResult: "",
  isExistingSizesFetching: false,
  existingSizes: [],
  updatingSizes: [],
  sizeUpdateResults: "",
  isSizeUpdating: false,
  preUpdateValue: "",
  updatedSizeValue: "",
  errorMsg: ""
};

function admSizes(state = initialState, action) {
  switch (action.type) {
    case GET_NEW_SIZE_NAME:
      return {
        ...state,
        newSizeName: action.payload
      };
    case FETCH_NEW_SIZE_REQUESTED:
      return {
        ...state,
        isNewSizeFetching: true,
        checkNewSizeResult: ""
      };
    case FETCH_NEW_SIZE_SUCCEEDED:
      return {
        ...state,
        isNewSizeFetching: false,
        checkNewSizeResult: action.payload
      };
    case FETCH_NEW_SIZE_FAILED:
      return {
        ...state,
        isNewSizeFetching: false,
        checkNewSizeResult: action.payload
      };
    case FETCH_EXISTING_SIZE_REQUESTED:
      return {
        ...state,
        isExistingSizesFetching: true
      };
    case FETCH_EXISTING_SIZE_SUCCEEDED:
      return {
        ...state,
        isExistingSizesFetching: false,
        existingSizes: action.payload,
        updatingSizes: action.updatingSizes
      };
    case GET_NUPDATED_SIZE_NAME:
      return {
        ...state,
        updatingSizes: action.payload
      };
    case FETCH_UPDATING_SIZE_REQUESTED:
      return {
        ...state,
        isSizeUpdating: true,
        preUpdateValue: action.payload,
        sizeUpdateResults: "",
        errorMsg: "",
        updatedSizeValue: ""
      };
    case FETCH_UPDATING_SIZE_SUCCEEDED:
      return {
        ...state,
        isSizeUpdating: false,
        sizeUpdateResults: action.payload,
        updatedSizeValue: action.updatedSizeValue,
        preUpdateValue: ""
      };
    case FETCH_UPDATING_SIZE_FAILED:
      return {
        ...state,
        isSizeUpdating: false,
        errorMsg: action.payload,
        preUpdateValue: ""
      };

    default:
      return { ...state };
  }
}

export default admSizes;
