import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {requiredInput} from '../../../validation'
import customRequiredInput from '../../atomic/customRequiredInput';

class FormLogin extends Component {
    render(){
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>

                <div className='login-menu_form-fields'>
                    <p className='form-email_par'>First name</p>
                    <Field name="email" component={customRequiredInput}
                           className='login-field'
                           type="text" placeholder="Your email..."
                           validate={[requiredInput]}
                    />

                    <p className='form-pass_par'>Password</p>
                    <Field name="password" component={customRequiredInput}
                           className='login-field'
                           type="password" placeholder="Your email..."
                           validate={[requiredInput]}
                    />
                    <p>Forgotten your password?</p>
                </div>

                <button name='loginSbm' type="submit" className='enter_btn login_btn' label="submit">Log In</button>
            </form>
        );
    }
}




export default reduxForm({form: 'formLogin'})(FormLogin);