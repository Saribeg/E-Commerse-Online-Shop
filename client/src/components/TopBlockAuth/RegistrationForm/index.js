import React, {Component} from 'react';
import './RegistrationForm.scss';

import {connect} from 'react-redux'
import {addNewUser, CLOSE_LOGIN_FORM, CLOSE_REG_FORM, OPEN_LOGIN_FORM, OPEN_REG_FORM} from '../../../actions/login'

class RegistrationForm extends Component {
        state = {
            firstName: '',
            secondName: '',
            email: '',
            password: '',
            password2: '',
        };

    checkValidation = (e) => {
        this.checkPassValidation(e);
        this.checkEmailValidation(e);
    };

    checkNameValidation = (e) => {
        if (e.target.value == '' || +e.target.value) {
            e.target.style.borderColor = 'red';
            e.preventDefault();
        } else {
            e.target.style.borderColor = '#eaeaea';
        }
    }

    checkPassValidation = () => {

        const firstPassword = this.state.password;
        const secondPassword = this.state.password2;

        if (firstPassword === secondPassword) {
            return true;
        } else {
            return false
        }
    };

    checkEmailValidation = (e) => {
        const email = document.getElementById('email');
        const chkEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!chkEmail.test(email.value)) {
            email.style.borderColor = 'red';
            e.preventDefault();
        } else {
            email.style.borderColor = '#eaeaea';
        }
    };

    onStateChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };


    sentRegistration() {

        let newForm = {};
        if (
            this.state.firstName !== '' &&
            this.state.secondName !== '' &&
            this.state.email !== '' &&
            this.state.password !== '' &&
            this.state.password === this.state.password2
        ) {

            for (let key in this.state) {
                newForm[key] = this.state[key];
            }
        }

        this.props.addNewUser(newForm);

    }

    render() {

        let classSecondPass = (this.checkPassValidation()) ? 'registration-input registration-form-input-grey' : 'registration-input registration-form-input-red';
        let classExistEmail = (this.props.windowsStatus.existEmail) ? null : 'd-none';

        return (
            <div className="registration">
                <div className="cancel-btn" onClick={() => this.props.closeRegForm()}></div>
                <h2 className='registration-header'>Registration</h2>
                <form>
                    <div>
                        <p>First Name</p>
                        <input className='registration-input'
                               required
                               name='firstName'
                               onChange={this.onStateChange}
                               onBlur={this.checkNameValidation}
                               type="text"/>
                    </div>
                    <div>
                        <p>Last Name</p>
                        <input className='registration-input'
                               required
                               name='secondName'
                               onChange={this.onStateChange}
                               onBlur={this.checkNameValidation}
                               type="text"/>
                    </div>
                    <div className={classExistEmail}>
                        This email is already used
                    </div>
                    <div>
                        <p>Email Address</p>
                        <input className='registration-input'
                               required
                               name='email'
                               onChange={this.onStateChange}
                               onBlur={this.checkEmailValidation}
                               type="email"
                               id='email'/>
                    </div>
                    <div>
                        <p>Password</p>
                        <input className='registration-input'
                               name='password'
                               onChange={this.onStateChange}
                               required
                               type="password"
                               id='firstPassword'/>
                    </div>
                    <div>
                        <p>Confirm Password</p>
                        <input className={classSecondPass}
                               required
                               name='password2'
                               onChange={this.onStateChange}
                               type="password"
                               id='secondPassword'/>
                    </div>
                    <input type="button"
                            onClick={() => this.sentRegistration()}
                            className='registration-form_button'
                            id="submit"
                    value="Register"/>

                </form>
                <div className='login-area'>
                    <div className='login_btn' onClick={() => this.props.openLoginForm()}>Login Here</div>
                </div>
            </div>
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
        closeRegForm: () => {
            dispatch({type: CLOSE_REG_FORM})
        },
        openLoginForm: () => {
            dispatch({type: CLOSE_REG_FORM});
            dispatch({type: OPEN_LOGIN_FORM});
        },
        addNewUser: (regForm) => dispatch(addNewUser(regForm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)