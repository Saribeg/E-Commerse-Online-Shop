import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import login from "./login";
import navMenu from "./navMenu";
import product from "./product";
import filters from "./filters";
import productDetails from "./productDetails";
import categoryCarousel from "./categoryCarousel";
import cart from "./cart";
import addToCart from "./addToCart";
import search from "./search";
import scroll from "./scroll";

//For Admin Dashboard
import admNavMenu from "./adminDashboard/admNavMenuStates";
import admProducts from "./adminDashboard/admProductsStates";
import admColors from "./adminDashboard/admColorStates";
import admSizes from "./adminDashboard/admSizeStates";


const rootReducer = combineReducers({
  login,
  navMenu,
  form: formReducer,
  product,
  categoryCarousel,
  filters,
  productDetails,
  cart,
  addToCart,
  search,
  //For Admin Dashboard
  admNavMenu,
  admProducts,
  admColors,
  admSizes,
    scroll
});

export default rootReducer;
