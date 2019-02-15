import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import login from "./login";
import navMenu from "./navMenu";
import product from "./product";

//For Admin Dashboard
import admNavMenu from "./adminDashboard/admNavMenuStates";

const rootReducer = combineReducers({
  login,
  navMenu,
  form: formReducer,
  product,

  //For Admin Dashboard
  admNavMenu
});

export default rootReducer;
