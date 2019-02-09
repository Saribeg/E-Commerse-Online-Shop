import axios from "axios";

export const SEND_NAV_REQUEST = "SEND_NAV_REQUEST"; // Preloader while executing asynchronous action
export const GET_NAV_MENU = "GET_NAV_MENU"; // Get Navigation menu items from server

export const OPEN_SUB_MENU = "OPEN_SUB_MENU";
export const CLOSE_SUB_MENU = "CLOSE_SUB_MENU";

export const getNavMenuItems = () => dispatch => {
  dispatch({
    type: SEND_NAV_REQUEST
  });

  axios.get("/nav-menu").then(navMenuItems => {
    dispatch({
      type: GET_NAV_MENU,
      payload: navMenuItems.data[0].categoryList // The Array with the hierarchy Of Navigation menu categories (e.g. women) / subcategories (e.g. clothing) / further subcategories (e.g. pants, dresses)
    });
  });
};

export const openSubMenu = () => dispatch => {
  dispatch({
    type: OPEN_SUB_MENU
  });
};

export const closeSubMenu = () => dispatch => {
  dispatch({
    type: CLOSE_SUB_MENU
  });
};
