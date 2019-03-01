import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import ProductPage from "./components/ProductPage";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import TestAddToCart from "./components/Cart/testAddToCart";
import FilteredProductList from "./components/FilteredProductList";
import AdminDashboard from "./components/AdminDashboard";
import RedirectLogin from "./components/TopBlockAuth/RedirectLogin";
import AboutUs from "./components/StaticPages/AboutUs"

import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setLoggedUser, unsetLoggedUser } from "./actions/login";

import {
  SET_CART_FROM_LOCALSTORAGE,
  SET_ID_LOGGED_USER,
  getCart
} from "./actions/cart";

import Unsubscribe from "./components/Unsubscribe";
import "./scss/style.scss";

library.add(faQuestion);

if (localStorage.jwtToken) {
  //Set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user ans is isAuthenticated
  store.dispatch(setLoggedUser(decoded._doc));
  store.dispatch({
    type: SET_ID_LOGGED_USER,
    payload: { idUser: decoded._doc._id }
  });

  // store.dispatch(getCart({idUser: decoded._doc._id}));
  getCart({ idUser: decoded._doc._id });

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(unsetLoggedUser());
    //Clear the curren profile
    // store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = "/";
  }
} else if (localStorage.savedCart) {
  store.dispatch({
    type: SET_CART_FROM_LOCALSTORAGE,
    payload: { arrLS: JSON.parse(localStorage.savedCart) }
  });
}

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route path="/users/profile" component={Profile} />
          <Route exact path="/login" component={RedirectLogin} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/addCart" component={TestAddToCart} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route
            exact
            path="/:category/:subCategory/:furtherSubCategory/:id"
            component={ProductPage}
          />
          <Route
            exact
            path="/:category/:subCategory?/:furtherSubCategory?"
            component={FilteredProductList}
          />
          <Route exact path="/unsubscribe/:id" component={Unsubscribe} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
