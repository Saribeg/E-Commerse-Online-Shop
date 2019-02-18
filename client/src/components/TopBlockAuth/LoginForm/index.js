import React, {Component, Fragment} from 'react';

import './LoginForm.scss';
import {connect} from "react-redux";
import {checkLogin, CLOSE_LOGIN_FORM, OPEN_REG_FORM} from "../../../actions/login";

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
    }

    onStateChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    requestLogin() {
        let sendLogin = {};
        if (this.state.email !== '' && this.state.password !== '') {
            for (let key in this.state) {
                sendLogin[key] = this.state[key];
            }
        }
        this.props.checkLogin(sendLogin);
    }

    render() {

        let classCheckEmail = (this.props.windowsStatus.invalidLogin) ? 'red-color' : 'd-none';

        return (
            <Fragment>
                <div className='login-menu'>
                    <div className="cancel-btn" onClick={() => this.props.closeLoginForm()} />
                    <h2 className='login-menu_header'>Log in</h2>
                    <p className='login-menu_par'>Please enter your account details to log in</p>
                    <form className='login-menu_form'>
                        <div className='login-menu_form-fields'>
                            <p className='form-email_par'>Email address <span className={classCheckEmail}>(Invalid email or password)</span></p>
                            <input type="text"
                                   name='email'
                                   required
                                   className='login-form-field login-field'
                                   onChange={this.onStateChange}
                                   value={this.state.email}/>
                            <p className='form-pass_par'>Password</p>
                            <input type="password"
                                   name='password'
                                   required
                                   className='login-form-field pass-field'
                                   onChange={this.onStateChange}
                                   value={this.state.password}/>
                            <p>Forgotten your password?</p>
                        </div>
                    </form>
                    <div className="enter_btn" onClick={() => this.requestLogin()}>Log In</div>
                    <div className='registration-area'>
                        <div className='enter_btn register_btn' onClick={() => this.props.openRegForm()}>Register Here
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        checkLogin: (loginForm) => dispatch(checkLogin(loginForm)),

        closeLoginForm: () => {
            dispatch({type: CLOSE_LOGIN_FORM})
        },

        openRegForm: () => {
            dispatch({type: CLOSE_LOGIN_FORM});
            dispatch({type: OPEN_REG_FORM})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
