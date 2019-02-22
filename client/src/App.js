import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
// import TopBlockAuth from './components/TopBlockAuth'

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import ProductPage from "./components/ProductPage";
import Profile from "./components/Profile";
// import ProductPage from "./components/ProductPage";
import AdminDashboard from "./components/AdminDashboard";

import "./scss/style.scss";

library.add(faQuestion);

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/products/:category/:subCategory/:furtherSubCategory/:id" component={ProductPage}/>
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
