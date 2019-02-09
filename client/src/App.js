import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
// import ProductsCarousel from './components/ProductsCarousel'
// import TopBlockAuth from './components/TopBlockAuth'

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";

// import "./scss/style.scss";
import "./app.scss";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
