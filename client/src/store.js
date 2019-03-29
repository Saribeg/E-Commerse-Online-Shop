import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =
  process.env.NODE_ENV === "development"
    ? createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)))
    : createStore(rootReducer, applyMiddleware(thunk));

export default store;
