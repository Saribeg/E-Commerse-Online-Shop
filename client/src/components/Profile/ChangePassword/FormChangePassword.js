import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {requiredInput, matchPasswords} from '../../../validation'
import customRequiredInput from '../../atomic/customRequiredInput';

class FormChangePassword extends Component {
    render(){
        const {handleSubmit, pristine, submitting, invalid} = this.props;
        return (
            <form onSubmit={handleSubmit}>

                <div className='section-profile-content-label'>
                    Current password
                </div>
                <Field name="currPass" component={customRequiredInput}
                       type="password" placeholder="Your current password..."
                       className='section-profile-content-input'
                       validate={[requiredInput]}
                />
                <div className='section-profile-content-label'>
                    New password
                </div>
                <Field name="newPass" component={customRequiredInput}
                       type="password" placeholder="Your current password..."
                       className='section-profile-content-input'
                       validate={[requiredInput]}
                />
                <div className='section-profile-content-label'>
                    Confirm new password
                </div>
                <Field name="newPass2" component={customRequiredInput}
                       type="password" placeholder="Your current password..."
                       className='section-profile-content-input'
                       validate={[requiredInput, matchPasswords]}
                />


                <button name='personalSbm' disabled={invalid || pristine || submitting}
                        type="submit" className='section-profile-content-btn' label="submit">Save password</button>
            </form>
        );
    }
}


export default reduxForm({form: 'formChangePassword'})(FormChangePassword);