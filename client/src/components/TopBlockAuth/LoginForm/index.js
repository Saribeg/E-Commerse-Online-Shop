import React, {Component, Fragment} from 'react';

import './LoginForm.scss';
import {connect} from "react-redux";
import {addNewUser, checkLogin, CLOSE_LOGIN_FORM, OPEN_REG_FORM} from "../../../actions/login";


class LoginForm extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        email: '',
        password: '',
    }

    onStateChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    requestLogin () {
        let sendLogin = {};
        if (this.state.email !== '' && this.state.password !== '') {
            for (let key in this.state) {
                sendLogin[key] = this.state[key];
            }
        }
        this.props.checkLogin(sendLogin);
    }

    render() {

        let classCheckEmail = (this.props.windowsStatus.invalidLogin) ? null : 'd-none';

        return (
            <Fragment>
                <div className='login-menu'>
                    <form className='login-menu_form'>
                        <div className='login-menu_form-text'>
                            <p>Login</p>
                            <p>Password</p>
                        </div>

                        <div className={classCheckEmail}>
                            Invalid Email or password
                        </div>

                        <div className='login-menu_form-fields'>
                            <input type="text"
                                   name='email'
                                   required
                                   className='login-field'
                                   onChange={this.onStateChange}
                                   value={this.state.email}/>
                            <input type="password"
                                   name='password'
                                   required
                                   className='pass-field'
                                   onChange={this.onStateChange}
                                   value={this.state.password}/>
                        </div>
                    </form>
                    <div className='login-menu_buttons'>
                        <div className="enter-btn signUp" onClick={() => this.props.closeLoginForm()}>Cancel</div>
                        <div className="enter-btn logIn" onClick={() => this.requestLogin()}>Log In</div>
                    </div>
                    <p className='get-account'>Haven't account? <span
                        onClick={() => this.props.openRegForm()}>Registration</span></p>

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