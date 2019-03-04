import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import RedirectLogin from "./components/TopBlockAuth/RedirectLogin";

import {checkLoginCartOnStart} from "./actions/login";


import "./scss/style.scss";

library.add(faQuestion);


class App extends Component {
  render() {

      checkLoginCartOnStart();

    return (
      <>
        <Switch>
            <Route exact path="/login" component={RedirectLogin} />
            <Route path="/admin/dashboard" component={AdminDashboard} />
            <Route path="/" component={Dashboard} />
        </Switch>
      </>
    );
  }
}

export default App;
