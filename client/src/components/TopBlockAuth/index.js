import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {
  OPEN_LOGIN_FORM,
  OPEN_LOGIN_DETAILS,
  CLOSE_LOGIN_DETAILS,
  LOGOUT
} from "../../actions/login";

import "./TopBlockAuth.scss";
import Search from "../Search";

import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TopBlockAuth extends Component {
  render() {
    let classLoginForm = this.props.windowsStatus.formLoginOpen
      ? null
      : "d-none";

    let classRegistrationForm = this.props.windowsStatus.formRegisterOpen
      ? null
      : "d-none";

    let classDetailLogin = this.props.windowsStatus.loginDetails
      ? null
      : "d-none";

    let isLogged = this.props.login.isLogged ? null : "d-none";

    let notLogged = !this.props.login.isLogged ? null : "d-none";

    return (
      <div className="main-right">
        <Search />
        <div className="main-date">
          <div className={notLogged}>
            <div>
              <input
                type="button"
                className="header-top-login-btn"
                value="Log in"
                onClick={() => this.props.openLoginForm()}
              />
            </div>
          </div>

          <div className={`user-info-mini ${isLogged}`}>
            <span className="user-name">
              {this.props.login.loggedData.firstName}
            </span>
            <div className="user-avatar-mini">
              <img
                src="/img/account.png"
                alt=""
                onClick={() => this.props.openLoginDetails()}
              />
            </div>
          </div>

          <div className="pruduct-cart-ico">
            <img src="/img/basket.png" alt="" />
          </div>

          <div className={`admin-dashboard ${isLogged}`}>
            <NavLink className="admin-dashboard-link" to="/admin/dashboard">
              <FontAwesomeIcon icon={faCogs} />
            </NavLink>
          </div>
        </div>

        <div className={classLoginForm}>
          <LoginForm />
        </div>

        <div className={classRegistrationForm}>
          <RegistrationForm />
        </div>

        <div className={classDetailLogin}>
          <div className="header-dropdown-login-details">
            <NavLink
              to="/profile/personalContent"
              onClick={() => this.props.closeLoginDetails()}
            >
              PROFILE
            </NavLink>
            <input
              type="button"
              value="logout"
              onClick={() => this.props.logout()}
            />
            <input
              type="button"
              value="close"
              onClick={() => this.props.closeLoginDetails()}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    windowsStatus: state.login.windowsStatus,
    login: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openLoginForm: () => {
      dispatch({ type: OPEN_LOGIN_FORM });
    },
    openLoginDetails: () => {
      dispatch({ type: OPEN_LOGIN_DETAILS });
    },
    closeLoginDetails: () => {
      dispatch({ type: CLOSE_LOGIN_DETAILS });
    },
    logout: () => {
      dispatch({ type: LOGOUT });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBlockAuth);
