import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router-dom";
import FormLogin from '../LoginForm/FormLogin'

import './RedirectLogin.scss';
import {checkRedirectLogin} from "../../../actions/login";

class RedirectLogin extends Component {


    handleSubmit = (values) => {
        let historyLink = this.props.login.historyPath;

        let sendLogin = {
            email: values.email,
            password: values.password
        };

        this.props.checkRedirectLogin(sendLogin, this.props.history, historyLink);

    }


    render() {

        let classCheckEmail = (this.props.windowsStatus.invalidLogin) ? null : 'd-none';

        return (
            <Fragment>
                <NavLink
                    to="/"
                    // onClick={() => this.props.goToProfile(this.props.history)}
                >
                    Back to main page
                </NavLink>
                <div className='redirect-login'>
                    <h2 className='login-menu_header'>Log in</h2>
                    <p className='login-menu_par'>Please enter your account details to log in</p>


                    <div className={classCheckEmail}>
                        Invalid Email or password
                    </div>
                    <FormLogin onSubmit={this.handleSubmit}/>


                </div>
            </Fragment>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        windowsStatus: state.login.windowsStatus,
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkRedirectLogin: (loginForm, history, link) => dispatch(checkRedirectLogin(loginForm, history, link)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RedirectLogin))