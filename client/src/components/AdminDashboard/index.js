import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";

//Components
import AdmNavMenu from "./AdmNavMenu";
import AdmProducts from "./AdmProducts";
import AdmCarousel from "./AdmCarousel";
import AdmUsers from "./AdmUsers";
import AdmFooter from "./AdmFooter";

import "../../scss/resources/resources.scss";
import "./adminDashboard.scss";

class AdminDashboard extends Component {
  render() {
    return (
      <div className="admin-dashboard-wrapper">
        <div className="admin-dashboard">
          <ul className="admin-dashboard-list">
            <li className="admin-dashboard-item">
              <NavLink
                className="admin-dashboard-link"
                activeClassName="admin-dashboard-link-active"
                to="/admin/dashboard/navigation-menu"
              >
                Navigation menu
              </NavLink>
            </li>
            <li className="admin-dashboard-item">
              <NavLink
                className="admin-dashboard-link"
                activeClassName="admin-dashboard-link-active"
                to="/admin/dashboard/products"
              >
                Products
              </NavLink>
            </li>
            <li className="admin-dashboard-item">
              <NavLink
                className="admin-dashboard-link"
                activeClassName="admin-dashboard-link-active"
                to="/admin/dashboard/carousel"
              >
                Carousel
              </NavLink>
            </li>
            <li className="admin-dashboard-item">
              <NavLink
                className="admin-dashboard-link"
                activeClassName="admin-dashboard-link-active"
                to="/admin/dashboard/users"
              >
                Users
              </NavLink>
            </li>
            <li className="admin-dashboard-item">
              <NavLink
                className="admin-dashboard-link"
                activeClassName="admin-dashboard-link-active"
                to="/admin/dashboard/footer"
              >
                Footer
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="admin-dashboard-content">
          <Route
            exact
            path="/admin/dashboard/navigation-menu"
            component={AdmNavMenu}
          />
          <Route
            exact
            path="/admin/dashboard/products"
            component={AdmProducts}
          />
          <Route
            exact
            path="/admin/dashboard/carousel"
            component={AdmCarousel}
          />
          <Route exact path="/admin/dashboard/users" component={AdmUsers} />
          <Route exact path="/admin/dashboard/footer" component={AdmFooter} />
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
