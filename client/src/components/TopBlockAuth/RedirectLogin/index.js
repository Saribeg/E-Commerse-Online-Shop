import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import FormLogin from '../LoginForm/FormLogin'

import './RedirectLogin.scss';

class RedirectLogin extends Component {



    handleSubmit = (values) => {

        let sendLogin = {
            email: values.email,
            password: values.password
        };

        this.props.checkLogin(sendLogin);

    }


    render() {

        let classCheckEmail = (this.props.windowsStatus.invalidLogin) ? null : 'd-none';

        return (
            <Fragment>
                <div className='redirect-login'>
                    <h2 className='login-menu_header'>Log in</h2>
                    <p className='login-menu_par'>Please enter your account details to log in to your user account</p>


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


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedirectLogin)