import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {correctEmail} from '../../../../validation'
import customRequiredInput from '../../../atomic/customRequiredInput';

class FormCheckoutByEmail extends Component {
    render(){
        const {handleSubmit, pristine, submitting, invalid} = this.props;
        return (
            <form onSubmit={handleSubmit} className='login-menu_form' >

                <div className='field-wrapper' >
                    <p className='login-form-input-title'>E-mail</p>
                    <Field name="email" component={customRequiredInput}
                           className='login-form-input'
                           classError='input-error-message'
                           type="text" placeholder="Your email..."
                           validate={[correctEmail]}
                    />

                    {/*<p>Forgotten your password?</p>*/}
                </div>

                <button name='loginSbm' disabled={invalid || pristine || submitting} type="submit" className='login-form_btn' label="submit">Send order</button>
            </form>
        );
    }
}




export default reduxForm({form: 'formCheckoutByEmail'})(FormCheckoutByEmail);