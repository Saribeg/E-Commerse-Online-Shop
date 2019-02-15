import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";

import { getAdmNavMenuItems } from "../../actions/adminDashboard/admNavMenuActions";

//Components
import AdmNavMenu from "./AdmNavMenu";

import "../../scss/resources/resources.scss";
import "./adminDashboard.scss";

class AdminDashboard extends Component {
  // Calling action-creator for getting from server object with Navigation Menu Items
  componentDidMount() {
    this.props.getAdmNavMenuItems();
  }

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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    navMenuItems: state.navMenu.navMenuItems,
    isMenuFetching: state.navMenu.isMenuFetching
  };
};

export default connect(
  mapStateToProps,
  { getAdmNavMenuItems }
)(AdminDashboard);