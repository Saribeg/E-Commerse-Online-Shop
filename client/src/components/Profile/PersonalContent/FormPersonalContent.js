import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {requiredInput, correctEmail} from '../../../validation'
import customRequiredInput from '../../atomic/customRequiredInput';
import customCorrectEmail from '../../atomic/customCorrectEmail';

class FormPersonalContent extends Component {
    render(){
        const {handleSubmit, pristine, submitting, invalid} = this.props;
        return (
            <form onSubmit={handleSubmit}>

                <div className='section-profile-content-label'>
                    First name
                </div>
                <Field name="firstName" component={customRequiredInput}
                       type="text" placeholder="Your first name..."
                       validate={[requiredInput]}
                />
                <div className='section-profile-content-label'>
                    Last name
                </div>
                <Field name="secondName" component={customRequiredInput}
                       type="text" placeholder="Your second name..."
                       validate={[requiredInput]}
                />
                <div className='section-profile-content-label'>
                    Email address
                </div>
                <Field name="email" component={customCorrectEmail}
                       type="text" placeholder="Your e-mail..."
                       validate={[correctEmail]}
                />


                <button name='personalSbm' disabled={invalid || pristine || submitting} type="submit" className='section-profile-content-btn' label="submit">Save changes</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: {
            firstName: state.login.loggedData.firstName,
            secondName: state.login.loggedData.secondName,
            email: state.login.loggedData.email,
        }
    }
}

FormPersonalContent = reduxForm({
    form: 'formProfilePersonal'
})(FormPersonalContent);


export default connect(mapStateToProps)(FormPersonalContent);