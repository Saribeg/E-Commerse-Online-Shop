import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {requiredInput} from '../../validation'
import customRequiredInput from './customRequiredInput';

class FormLogin extends Component {
    render(){
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit} className='login-menu_form' >

                <div className='field-wrapper' >
                    <label className='login-form-input-title'>E-mail
                    <Field name="email" component={customRequiredInput}
                           className='login-form-input'
                           classError='input-error-message'
                           type="text" placeholder="Your email..."
                           validate={[requiredInput]}
                    />
</label>
                    <p className='login-form-input-title'>Password</p>
                    <Field name="password" component={customRequiredInput}
                           className='login-form-input'
                           classError='input-error-message'
                           type="password" placeholder="Your email..."
                           validate={[requiredInput]}
                    />
                    {/*<p>Forgotten your password?</p>*/}
                </div>

                <button name='loginSbm' type="submit" className='login-form_btn' label="submit">Log In</button>
            </form>
        );
    }
}




export default reduxForm({form: 'formLogin'})(FormLogin);