import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import login from "./login";
import navMenu from "./navMenu";
import product from "./product";

const rootReducer = combineReducers({
    login,
    navMenu,
    form: formReducer,
    product
});

export default rootReducer;
