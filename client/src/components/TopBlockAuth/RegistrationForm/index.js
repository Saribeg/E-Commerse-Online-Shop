import React, {Component} from 'react';
import './RegistrationForm.scss';

import {connect} from 'react-redux'
import {addNewUser, CLOSE_REG_FORM} from '../../../actions/login'

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            secondName: '',
            email: '',
            password: '',
            password2: '',
        }

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

    checkEmailValidation = (e) =>  {
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
            <div className='registration-wrapper'>
                <div className="registration">
                    <div className="registration_header">
                        <p>Sign Up</p>
                        <p>Log In</p>
                    </div>
                    <div className="registration_social">
                        <a href="#">
                            <div className="facebook btn">
                                <div className="facebook-logo"/>
                                <p>Facebook</p>
                            </div>
                        </a>
                        <a href="#">
                            <div className="google btn">
                                <div className="google-logo"/>
                                <p>Google</p>
                            </div>
                        </a>
                    </div>
                    <div className="sidelines">
                        <div/>
                        <p>or</p>
                        <div/>
                    </div>
                    <form>
                        <div><input className='registration-input'
                                    required
                                    name='firstName'
                                    onChange={this.onStateChange}
                                    onBlur={this.checkNameValidation}
                                    type="text"
                                    placeholder="First Name"/>
                        </div>
                        <div><input className='registration-input'
                                    required
                                    name='secondName'
                                    onChange={this.onStateChange}
                                    onBlur={this.checkNameValidation}
                                    type="text"
                                    placeholder="Second Name"/>
                        </div>
                        <div className={classExistEmail}>
                            This email is already used
                        </div>


                        <div><input className='registration-input'
                                    required
                                    name='email'
                                    onChange={this.onStateChange}
                                    onBlur={this.checkEmailValidation}
                                    type="email"
                                    id='email'
                                    placeholder="Email"/></div>
                        <div><input className='registration-input'
                                    name='password'
                                    onChange={this.onStateChange}
                                    required
                                    type="password"
                                    id='firstPassword'
                                    placeholder="Choose Password"/></div>
                        <div><input className={classSecondPass}
                                    required
                                    name='password2'
                                    onChange={this.onStateChange}
                                    type="password"
                                    id='secondPassword'
                                    placeholder="Confirm Password"/></div>
                        <label className="checkbox-container">
                            Agree our
                            <a href="#"> Terms &amp; Conditions</a>
                            <input required type="checkbox" id="check"/>
                            <span className="checkmark"/>
                        </label>
                        <div className='registration-form_buttons'>
                            <div className='registration-form_button' id="cancel"
                                 onClick={() => this.props.closeRegForm()}>Cancel
                            </div>
                            <button type="submit"
                                    onClick={() => this.sentRegistration()}
                                    className='registration-form_button'
                                    id="submit">
                                Create Account
                            </button>
                        </div>
                    </form>
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
        addNewUser: (regForm) => dispatch(addNewUser(regForm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)