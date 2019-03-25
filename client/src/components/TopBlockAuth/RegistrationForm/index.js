import React, {Component} from 'react';


import {connect} from 'react-redux'
import {addNewUser, CLOSE_REG_FORM, OPEN_LOGIN_FORM} from '../../../actions/login'

import FormRegistration from './FormRegistration'

import './RegistrationForm.scss';

class RegistrationForm extends Component {


    handleSubmit = (values) => {

        let newForm = {

            firstName: values.firstName,
            secondName: values.secondName,
            email: values.email,
            password: values.password,
            password2: values.password2,
        };

        this.props.addNewUser(newForm);

    }



    render() {

        // let classSecondPass = (this.checkPassValidation()) ? 'registration-input registration-form-input-grey' : 'registration-input registration-form-input-red';
        let classExistEmail = (this.props.windowsStatus.existEmail) ? null : 'd-none';

        return (
            <div className="modal-backdrop">
            <div className='login-menu'>
                <div data-btn="btn-reg-up-close" className="login-cancel-btn" />
                <h2 className='login-menu_header'>Registration</h2>
                <FormRegistration onSubmit={this.handleSubmit}/>


                <div className='registration-area'>
                    <div data-btn="btn-reg-down-close" className='login-form_btn register_btn' >Login Here</div>
                </div>
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