import {
  GET_NAV_MENU,
  SEND_NAV_REQUEST,
  OPEN_SUB_MENU,
  CLOSE_SUB_MENU
} from "../../actions/navMenuActions";

const initialState = {
  isMenuFetching: false,
  navMenuItems: [],
  navMenuWindowStatus: false
};

function navMenu(state = initialState, action) {
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
    case OPEN_SUB_MENU:
      return {
        ...state,
        navMenuWindowStatus: true
      };
    case CLOSE_SUB_MENU:
      return {
        ...state,
        navMenuWindowStatus: false
      };
    default:
      return { ...state };
  }
}

export default navMenu;
