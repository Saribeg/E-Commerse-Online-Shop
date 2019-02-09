import React, { Component, Fragment } from "react";

import TopBlockAuth from "../TopBlockAuth";
import NavMenu from "./NavMenu";

class Header extends Component {
  render() {
    return (
      <header class="main-header">
        <div class="container">
          <div class="header-content">
            <div class="header-burger-menu" />
            <a href="" class="logo">
              <img src="../img/matter.png" alt="Matter" />
            </a>

            <TopBlockAuth />
            <NavMenu />

            <div class="main-right">
              <input type="text" class="main-search" placeholder="Search" />
              <div class="main-date">
                <a href="" class="location-person">
                  <img src="../img/location.png" alt="" />
                </a>
                <a href="" class="account-person">
                  <img src="../img/account.png" alt="" />
                </a>
                <a href="" class="basket-person">
                  <img src="../img/basket.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
