import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {requiredInput, correctEmail, matchPasswordsReg} from '../../../validation'
import customRequiredInput from '../../atomic/customRequiredInput';
import {connect} from "react-redux";

class FormRegistration extends Component {
    render(){
        const {handleSubmit} = this.props;
        let classExistEmail = (this.props.windowsStatus.existEmail) ? null : 'd-none';
        return (
            <form onSubmit={handleSubmit}>

                <div>
                    <p>First Name</p>
                    <Field name="firstName" component={customRequiredInput}
                           className='registration-input'
                           classError='input-error-message'
                           type="text" placeholder="Your first name..."
                           validate={[requiredInput]}
                    />
                </div>

                <div>
                    <p>Last Name</p>
                    <Field name="secondName" component={customRequiredInput}
                           className='registration-input'
                           classError='input-error-message'
                           type="text" placeholder="Your last name..."
                           validate={[requiredInput]}
                    />
                </div>
                <div className={classExistEmail}>
                    This email is already used
                </div>

                <div>
                    <p>Email Address</p>
                    <Field name="email" component={customRequiredInput}
                           className='registration-input'
                           classError='input-error-message'
                           type="email" placeholder="Your email..."
                           validate={[requiredInput, correctEmail]}
                    />
                </div>

                <div>
                    <p>Password</p>
                    <Field name="password" component={customRequiredInput}
                           className='registration-input'
                           classError='input-error-message'
                           type="password" placeholder="Your password..."
                           validate={[requiredInput]}
                    />
                </div>

                <div>
                    <p>Confirm Password</p>
                    <Field name="password2" component={customRequiredInput}
                           className='registration-input'
                           classError='input-error-message'
                           type="password" placeholder="Your password..."
                           validate={[requiredInput, matchPasswordsReg]}
                    />
                </div>


                <button name='registrationSbm' type="submit" className='registration-form_button' label="submit">Register</button>
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