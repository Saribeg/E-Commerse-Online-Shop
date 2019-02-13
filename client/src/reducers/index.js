import {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form';
import login from "./login";
import navMenu from "./navMenu";

const rootReducer = combineReducers({
    login,
    navMenu,
    form: formReducer
});

export default rootReducer;
