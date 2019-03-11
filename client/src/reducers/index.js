import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import login from "./login";
import navMenu from "./navMenu";
import product from "./product";
import filters from "./filters";
import productDetails from "./productDetails";
import categoryCarousel from "./categoryCarousel";
import cart from "./cart";
import search from "./search";

//For Admin Dashboard
import admNavMenu from "./adminDashboard/admNavMenuStates";

const rootReducer = combineReducers({
  login,
  navMenu,
  form: formReducer,
  product,
  categoryCarousel,
  filters,
  productDetails,
  cart,
  search,
  //For Admin Dashboard
  admNavMenu
});

export default rootReducer;
