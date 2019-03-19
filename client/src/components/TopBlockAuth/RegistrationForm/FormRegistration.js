import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {requiredInput, correctEmail, matchPasswordsReg} from '../../../validation'
import customRequiredInput from '../../atomic/customRequiredInput';
import {connect} from "react-redux";

class FormRegistration extends Component {
    render() {
        const {handleSubmit} = this.props;
        let classExistEmail = (this.props.windowsStatus.existEmail) ? null : 'd-none';
        return (
            <form onSubmit={handleSubmit} className='login-menu_form'>

                <div className='login-menu_form-fields'>
                    <p className='login-form-input-title'>First Name</p>
                    <Field name="firstName" component={customRequiredInput}
                           className='login-form-input'
                           classError='input-error-message'
                           type="text" placeholder="Your first name..."
                           validate={[requiredInput]}
                    />

                    <p className='login-form-input-title'>Last Name</p>
                    <Field name="secondName" component={customRequiredInput}
                           className='login-form-input'
                           classError='input-error-message'
                           type="text" placeholder="Your last name..."
                           validate={[requiredInput]}
                    />
                    <div className={classExistEmail}>
                        This email is already used
                    </div>
                    <p className='login-form-input-title'>Email Address</p>
                    <Field name="email" component={customRequiredInput}
                           className='login-form-input'
                           classError='input-error-message'
                           type="email" placeholder="Your email..."
                           validate={[requiredInput, correctEmail]}
                    />
                    <p className='login-form-input-title'>Password</p>
                    <Field name="password" component={customRequiredInput}
                           className='login-form-input'
                           classError='input-error-message'
                           type="password" placeholder="Your password..."
                           validate={[requiredInput]}
                    />
                    <p className='login-form-input-title'>Confirm Password</p>
                    <Field name="password2" component={customRequiredInput}
                           className='login-form-input'
                           classError='input-error-message'
                           type="password" placeholder="Your password..."
                           validate={[requiredInput, matchPasswordsReg]}
                    />



                </div>
                <button name='registrationSbm' type="submit" className='login-form_btn'
                        label="submit">Register
                </button>
            </form>
    );
    }
    }


    const mapStateToProps = (state) => {
        return {
        windowsStatus: state.login.windowsStatus,
    }
    }

    FormRegistration = reduxForm({
        form: 'formRegistration'
    })(FormRegistration);

    export default connect(mapStateToProps)(FormRegistration);