import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import TopBlockAuth from "../TopBlockAuth";
import NavMenu from "./NavMenu";

import "./header.scss";

import logo from "../../img/matter.svg";

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <div className="header-burger-menu" />
            <NavLink to="/">
              <img src={logo} alt="Matter" />
            </NavLink>
            <NavMenu />
            <TopBlockAuth />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
