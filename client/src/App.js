import React, {Component, Fragment} from "react";
import {Switch, Route} from "react-router-dom";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestion} from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
// import ProductPage from "./components/ProductPage";
import FilteredProductList from "./components/FilteredProductList";
import AdminDashboard from "./components/AdminDashboard";
import RedirectLogin from "./components/TopBlockAuth/RedirectLogin";

import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setLoggedUser, unsetLoggedUser } from "./actions/login";

import "./scss/style.scss";

library.add(faQuestion);

if (localStorage.jwtToken) {
    //Set the auth token header auth
    setAuthToken(localStorage.jwtToken);
    //Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    //Set user ans is isAuthenticated
    store.dispatch(setLoggedUser(decoded));

    //Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        //Logout user
        store.dispatch(unsetLoggedUser());
        //Clear the curren profile
        // store.dispatch(clearCurrentProfile());
        //Redirect to login
        window.location.href = "/login";
    }
}

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/profile" component={Profile}/>
                    <Route exact path="/login" component={RedirectLogin}/>
                    <Route
                        exact
                        path="/:category/:subcategory?/:furthersubcategory?"
                        component={FilteredProductList}
                    />
                    <Route path="/admin/dashboard" component={AdminDashboard}/>

                    {/*<Route exact path="/product/1" component={ProductPage}/>*/}
                </Switch>
                <Footer/>
            </Fragment>
        );
    }
}

export default App;
