import {
  GET_NEW_COLOR_HEX,
  GET_NEW_COLOR_NAME,
  NEW_COLOR_MODAL_STATUS,
  FETCH_NEW_COLOR_REQUESTED,
  FETCH_NEW_COLOR_SUCCEEDED,
  FETCH_NEW_COLOR_FAILED,
  NEW_COLOR_MESSAGE,
  FETCH_EXISTING_COLOR_REQUESTED,
  FETCH_EXISTING_COLOR_SUCCEEDED
} from "../../actions/adminDashboard/admColorActions";

const initialState = {
  existingColors: [],
  isExistingColorsFetching: false,
  newColorName: "",
  newCssHexCode: "",
  newColorMessage: false,
  existingColorObject: {},
  newColorObject: {},
  newColorModalStatus: false,
  finalMessage: "",
  isAllColorsFetching: false
};

function admColors(state = initialState, action) {
  switch (action.type) {
    case GET_NEW_COLOR_HEX:
      return {
        ...state,
        newCssHexCode: action.payload
      };
    case GET_NEW_COLOR_NAME:
      return {
        ...state,
        newColorName: action.payload,
        finalMessage: ""
      };
    case NEW_COLOR_MESSAGE:
      return {
        ...state,
        newColorMessage: action.newColorMessage,
        existingColorObject: action.existingColorObject,
        isExistingColorsFetching: action.isExistingColorsFetching
      };
    case NEW_COLOR_MODAL_STATUS:
      return {
        ...state,
        newColorModalStatus: action.payload
      };
    case FETCH_NEW_COLOR_REQUESTED:
      return {
        ...state,
        isExistingColorsFetching: action.payload,
        finalMessage: ""
      };
    case FETCH_NEW_COLOR_SUCCEEDED:
      return {
        ...state,
        finalMessage: action.finalMessage,
        newColorObject: action.newColorObject,
        newColorModalStatus: action.newColorModalStatus,
        isExistingColorsFetching: false
      };
    case FETCH_NEW_COLOR_FAILED:
      return {
        ...state,
        finalMessage: action.finalMessage,
        newColorModalStatus: action.newColorModalStatus,
        isExistingColorsFetching: false
      };
    case FETCH_EXISTING_COLOR_REQUESTED:
      return {
        ...state,
        isAllColorsFetching: true
      };
    case FETCH_EXISTING_COLOR_SUCCEEDED:
      return {
        ...state,
        isAllColorsFetching: false,
        existingColors: action.payload
      };

    default:
      return { ...state };
  }
}

export default admColors;
