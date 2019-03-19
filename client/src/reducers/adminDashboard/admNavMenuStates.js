import {
  GET_NAV_MENU,
  SEND_NAV_REQUEST,
  CHANGE_SELECTED_ITEM_ACTIVE_STATUS,
  ADD_NEW_CATEGORY,
  ADD_NEW_SUB_CATEGORY,
  ADD_NEW_FURTHER_SUB_CATEGORY,
  SAVE_UPDATED_NAV_MENU
} from "../../actions/adminDashboard/admNavMenuActions";

const initialState = {
  isMenuFetching: false,
  navMenuItems: []
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
    case SAVE_UPDATED_NAV_MENU:
      return {
        ...state,
        navMenuItems: action.payload
      };

    default:
      return { ...state };
  }
}

export default admNavMenu;
