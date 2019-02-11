import React, { Component, Fragment } from "react";

import {NavLink} from 'react-router-dom'

import TopBlockAuth from "../TopBlockAuth";
import NavMenu from "./NavMenu";

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <div className="header-burger-menu" />
            <NavLink to="/">
                <img src="../img/matter.png" alt="Matter" />
            </NavLink>

            <TopBlockAuth />
              <NavMenu />

          </div>
        </div>
      </header>
    );
  }
}

export default Header;
