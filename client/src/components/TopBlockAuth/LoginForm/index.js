import React, {Component, Fragment} from 'react';

import {connect} from "react-redux";
import {checkLogin, CLOSE_LOGIN_FORM, CLOSE_REG_FORM, OPEN_LOGIN_FORM, OPEN_REG_FORM} from "../../../actions/login";

import FormLogin from './FormLogin'

import './LoginForm.scss';

class LoginForm extends Component {



    handleSubmit = (values) => {

        let sendLogin = {
            email: values.email,
            password: values.password
        };

        this.props.checkLogin(sendLogin);

    }

    clickLog = () => {
        console.log('hi click')
    }


    render() {

        let classCheckEmail = (this.props.windowsStatus.invalidLogin) ? null : 'd-none';

        return (
            <Fragment>
                <div className='login-menu' onClick={this.clickLog}>
                    <div data-btn="btn-login-up-close" className="cancel-btn"  />
                    <h2 className='login-menu_header'>Log in</h2>
                    <p className='login-menu_par'>Please enter your account details to log in to your user account</p>


                    <div className={classCheckEmail}>
                        Invalid Email or password
                    </div>
                    <FormLogin onSubmit={this.handleSubmit}/>

                    <div className='registration-area'>
                        <div id='header-from-login-to-reg' data-btn="btn-login-down-close" className='enter_btn register_btn'>Register Here
                        </div>
                    </div>
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

        checkLogin: (loginForm) => dispatch(checkLogin(loginForm)),
        openLoginForm: () => {
            dispatch({ type: OPEN_LOGIN_FORM });
        },
        closeLoginForm: () => {
            console.log('close login')
            dispatch({type: CLOSE_LOGIN_FORM})
        },

        openRegForm: () => {
            dispatch({type: CLOSE_LOGIN_FORM});
            dispatch({type: OPEN_REG_FORM})
        },
        closeRegForm: () => {
            dispatch({type: CLOSE_REG_FORM})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)