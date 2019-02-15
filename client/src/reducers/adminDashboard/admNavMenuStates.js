import {
  GET_NAV_MENU,
  SEND_NAV_REQUEST
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
    default:
      return { ...state };
  }
}

export default admNavMenu;
