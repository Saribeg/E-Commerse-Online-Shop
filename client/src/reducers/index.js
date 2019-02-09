import { combineReducers } from "redux";
import login from "./login";
import navMenu from "./navMenu";

const rootReducer = combineReducers({
  login,
  navMenu
});

export default rootReducer;
