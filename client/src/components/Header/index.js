import React, { Component, Fragment } from "react";

import {NavLink} from 'react-router-dom'

import TopBlockAuth from "../TopBlockAuth";
import NavMenu from "./NavMenu";

class Header extends Component {
  render() {
    return (
      <header class="main-header">
        <div class="container">
          <div class="header-content">
            <div class="header-burger-menu" />
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
