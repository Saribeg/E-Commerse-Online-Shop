import React, {Component} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router-dom";

import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {
    OPEN_LOGIN_FORM,
    OPEN_LOGIN_DETAILS,
    CLOSE_LOGIN_DETAILS,
    LOGOUT, CLOSE_LOGIN_FORM, CLOSE_REG_FORM, OPEN_REG_FORM,
    LOGOUT_JWT_CURRENT_USER, unsetLoggedUser, checkLogin, goToProfile
} from "../../actions/login";

import { SET_CART_FROM_LOCALSTORAGE} from "../../actions/cart";




import "./TopBlockAuth.scss";
import Search from "../Search";

import {faCogs} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class TopBlockAuth extends Component {


    componentDidMount () {

    }

    closeModal = () => {
        this.setState({
            modalFormOpen: false,
        })
    }

    clickOnLogin = () => {

        this.props.openLoginForm();

    }


    clickOnRegistration = () => {
        this.props.openRegForm();

    }

    handleLoginForm = (e) => {

        console.log('on click handleLoginForm')

        console.log('e.target', e.target)

        if (e.target.dataset.btn !== 'btn-login-up-close') {
            e.stopPropagation();
        }
        if (e.target.dataset.btn === 'btn-login-down-close') {
            this.props.closeLoginForm();
            this.closeModal();
            this.clickOnRegistration();
        }

    }

    handleRegistrationForm = (e) => {
        if (e.target.dataset.btn !== 'btn-reg-up-close') {
            e.stopPropagation();
        }
        if (e.target.dataset.btn === 'btn-reg-down-close') {
            this.props.closeRegForm();
            this.closeModal();
            this.clickOnLogin();
        }

    }

    handleDropDownProfile = (e) => {


    }


    render() {


        let classDetailLogin = this.props.windowsStatus.loginDetails
            ? null
            : "d-none";

        let isLogged = this.props.login.isLogged ? null : "d-none";

        let notLogged = !this.props.login.isLogged ? null : "d-none";

        let isCartNotEmpty = this.props.amountCart ? 'product-cart-ico-amount' : "d-none";

        return (
            <div className="header-right-block">
                <Search/>
                <div className="main-date">
                    <div className={notLogged}>
                        <div>
                            <input
                                type="button"
                                className="header-top-login-btn"
                                value="Log in"
                                onClick={() => this.clickOnLogin()}
                            />
                        </div>
                    </div>

                    <div className={isLogged}>
                        <div className="user-info-mini">
                            <span className="user-name">
                                {this.props.login.loggedData.firstName}
                            </span>
                            <div className="user-avatar-mini">
                                <img
                                    className="user-avatar-mini-img"
                                    src="/img/profile_logo.png"
                                    alt=""
                                    onClick={() => this.props.openLoginDetails()}
                                />

                                <div onClick={this.handleDropDownProfile}>
                                    {this.props.windowsStatus.loginDetails && (
                                        <div className="header-dropdown-login-details">
                                            <NavLink
                                                className="header-dropdown-login-details-item"
                                                to="/users/profile/personalContent"
                                                // onClick={() => this.props.goToProfile(this.props.history)}
                                            >
                                                Profile
                                            </NavLink>
                                            <NavLink
                                                className="header-dropdown-login-details-item"
                                                to="/users/profile/ordersHistory"
                                                // onClick={() => this.props.goToProfile(this.props.history)}
                                            >
                                                My Orders
                                            </NavLink>
                                            <NavLink
                                                className="header-dropdown-login-details-item"
                                                to="/"
                                                onClick={() => this.props.unsetLoggedUser()}
                                            >
                                                Logout
                                            </NavLink>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="product-cart-ico">
                        <NavLink to="/cart">
                            <img className="product-cart-ico-img" src="/img/cart_img.png" alt=""/>

                            <p className={isCartNotEmpty}>{this.props.amountCart}</p>
                        </NavLink>
                    </div>

                    <div>
                        <NavLink to="/addCart">
                            додати товар
                        </NavLink>
                    </div>


                    <div className={`admin-dashboard ${isLogged}`}>
                        <NavLink className="admin-dashboard-link" to="/admin/dashboard">
                            <FontAwesomeIcon icon={faCogs}/>
                        </NavLink>
                    </div>
                </div>

                <div id="header-modal-form" >
                    <div onClick={this.handleLoginForm}>
                        {this.props.windowsStatus.formLoginOpen && (
                            <LoginForm />
                        )}
                    </div>

                    <div onClick={this.handleRegistrationForm}>
                        {this.props.windowsStatus.formRegisterOpen && (
                            <RegistrationForm />
                        )}
                    </div>



                </div>



            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        windowsStatus: state.login.windowsStatus,
        login: state.login,
        amountCart: state.cart.amountInBasket,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openLoginForm: () => {
            dispatch({type: OPEN_LOGIN_FORM});
        },
        closeLoginForm: () => {
            dispatch({type: CLOSE_LOGIN_FORM})
        },
        openLoginDetails: () => {
            dispatch({type: OPEN_LOGIN_DETAILS});
        },
        closeLoginDetails: () => {
            dispatch({type: CLOSE_LOGIN_DETAILS});
        },
        openRegForm: () => {
            dispatch({type: CLOSE_LOGIN_FORM});
            dispatch({type: OPEN_REG_FORM})
        },
        closeRegForm: () => {
            dispatch({type: CLOSE_REG_FORM})
        },
        logout: () => {
            dispatch({type: LOGOUT_JWT_CURRENT_USER});
        },
        unsetLoggedUser: () => dispatch(unsetLoggedUser()),
        goToProfile: (history) => dispatch(goToProfile(history))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(TopBlockAuth));
