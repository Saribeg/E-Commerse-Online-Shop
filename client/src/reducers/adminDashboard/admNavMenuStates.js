import {
  GET_NAV_MENU,
  SEND_NAV_REQUEST,
  CHANGE_SELECTED_ITEM_ACTIVE_STATUS,
  ADD_NEW_CATEGORY,
  ADD_NEW_SUB_CATEGORY,
  ADD_NEW_FURTHER_SUB_CATEGORY,
  FETCH_NAV_MENU_REQUESTED,
  FETCH_NAV_MENU_SUCCEEDED,
  FETCH_NAV_MENU_FAILED
} from "../../actions/adminDashboard/admNavMenuActions";

const initialState = {
  isMenuFetching: false,
  navMenuItems: [],
  resultMessage: ""
};

function admNavMenu(state = initialState, action) {
  switch (action.type) {
    case SEND_NAV_REQUEST:
      return {
        ...state,
        isMenuFetching: true
      };
    case GET_NAV_MENU:
      return {
        ...state,
        navMenuItems: action.payload,
        isMenuFetching: false
      };
    case CHANGE_SELECTED_ITEM_ACTIVE_STATUS:
      return {
        ...state,
        navMenuItems: action.payload
      };
    case ADD_NEW_CATEGORY:
      return {
        ...state,
        navMenuItems: action.payload
      };
    case ADD_NEW_SUB_CATEGORY:
      return {
        ...state,
        navMenuItems: action.payload
      };
    case ADD_NEW_FURTHER_SUB_CATEGORY:
      return {
        ...state,
        navMenuItems: action.payload
      };
    case FETCH_NAV_MENU_REQUESTED:
      return {
        ...state,
        isMenuFetching: true,
        resultMessage: ""
      };

    case FETCH_NAV_MENU_SUCCEEDED:
      return {
        ...state,
        resultMessage: action.payload,
        isMenuFetching: false
      };
    case FETCH_NAV_MENU_FAILED:
      return {
        ...state,
        resultMessage: action.payload,
        isMenuFetching: false
      };

    default:
      return { ...state };
  }
}

export default admNavMenu;
