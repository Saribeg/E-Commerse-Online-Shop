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

    state = {
        modalFormOpen: false,
    }

    componentDidMount () {

    }

    openModal = () => {
        this.setState({
            modalFormOpen: true,
        })
    }

    closeModal = () => {
        this.setState({
            modalFormOpen: false,
        })
    }

    // clickRoot = () => {
    //     this.props.closeLoginForm();
    //     this.props.closeRegForm();
    //     this.closeModal();
    //     document.getElementById('root').removeEventListener('click', this.clickRoot);
    //     document.getElementById('header-modal-form').removeEventListener('click', this.clickModalLoginHub);
    //     document.getElementById('header-modal-form').removeEventListener('click', this.clickModalRegHub);
    // }
    //
    // clickModalLogin = (e) => {
    //
    //     console.log(e.target)
    //
    //     if (e.target.dataset.btn !== 'btn-login-up-close') {
    //         e.stopPropagation();
    //     }
    //     if (e.target.dataset.btn === 'btn-login-down-close') {
    //         this.props.closeLoginForm();
    //         this.closeModal();
    //         this.clickOnRegistration();
    //         document.getElementById('root').removeEventListener('click', this.clickRoot);
    //         document.getElementById('header-modal-form').removeEventListener('click', this.clickModalLoginHub);
    //     }
    // }
    //
    // clickModalLoginHub = (e) => {
    //     this.clickModalLogin(e);
    // }
    //
    // clickModalRegHub = (e) => {
    //     this.clickModalReg(e);
    // }
    //
    //
    // clickModalReg = (e) => {
    //     console.log(e.target)
    //
    //     if (e.target.dataset.btn !== 'btn-reg-up-close') {
    //         e.stopPropagation();
    //     }
    //     if (e.target.dataset.btn === 'btn-reg-down-close') {
    //         this.props.closeRegForm();
    //         this.closeModal();
    //         this.clickOnLogin();
    //         document.getElementById('root').removeEventListener('click', this.clickRoot);
    //         document.getElementById('header-modal-form').removeEventListener('click', this.clickModalRegHub);
    //     }
    //
    // }


    clickOnLogin = () => {

        this.openModal();
        this.props.openLoginForm();

        // document.getElementById('root').addEventListener('click', this.clickRoot);
        // document.getElementById('header-modal-form').addEventListener('click', this.clickModalLoginHub);

        document.getElementById('root').onclick = () => {
            this.props.closeLoginForm();
            this.props.closeRegForm();
            this.closeModal();
        };

        document.getElementById('header-modal-form').onclick = (e) => {

            if (e.target.dataset.btn !== 'btn-login-up-close') {
                e.stopPropagation();
            }
            if (e.target.dataset.btn === 'btn-login-down-close') {
                this.props.closeLoginForm();
                this.closeModal();
                this.clickOnRegistration();
            }
        }

    }


    clickOnRegistration = () => {

        this.openModal();
        this.props.openRegForm();

        // document.getElementById('root').addEventListener('click', this.clickRoot);
        // document.getElementById('header-modal-form').addEventListener('click', this.clickModalRegHub);

        document.getElementById('root').onClick = () => {
            this.props.closeLoginForm();
            this.props.closeRegForm();
            this.closeModal();

        };
        document.getElementById('header-modal-form').onclick = (e) => {

            if (e.target.dataset.btn !== 'btn-reg-up-close') {
                e.stopPropagation();
            }
            if (e.target.dataset.btn === 'btn-reg-down-close') {
                this.props.closeRegForm();
                this.closeModal();
                this.clickOnLogin();
            }
        }

    }


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


        let isModalOpen = this.state.modalFormOpen ? null : "d-none";

        let isCartNotEmpty = this.props.amountCart ? null : "d-none";

        return (
            <div className="main-right">
                <Search/>
                <div className="main-date">
                    <div className={notLogged}>
                            <input
                                type="button"
                                className="header-top-login-btn"
                                value="Log in"
                                onClick={() => this.clickOnLogin()}/>
                        
                    </div>


                    <div className={isLogged}>
                        <div className="user-info-mini">
                            <span className="user-name">
                                {this.props.login.loggedData.firstName}
                            </span>
                            <div className="user-avatar-mini">
                                <img
                                    src="/img/account.png"
                                    alt="icon-account"
                                    onClick={() => this.props.openLoginDetails()}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="pruduct-cart-ico">
                        <NavLink to="/cart">
                            <img src="/img/basket.png" alt="icon basket"/>

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

                <div id="header-modal-form" className={isModalOpen}>
                    <div>
                        {this.props.windowsStatus.formLoginOpen && (
                            <LoginForm/>
                        )}
                    </div>

                    <div>
                        {this.props.windowsStatus.formRegisterOpen && (
                            <RegistrationForm/>
                        )}
                    </div>
                </div>


                <div className={classDetailLogin}>
                    <div className="header-dropdown-login-details">
                        <NavLink
                            to="users/profile/personalContent"
                            // onClick={() => this.props.goToProfile(this.props.history)}
                        >
                            PROFILE
                        </NavLink>
                        <input
                            type="button"
                            value="logout"
                            className="login-btn"
                            onClick={() => this.props.unsetLoggedUser()}
                        />
                        <input
                            type="button"
                            value="x"
                            className="login-close-btn"
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
