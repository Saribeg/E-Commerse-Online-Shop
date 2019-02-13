import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import FormChangePassword from './FormChangePassword'
import {profileChangePassword} from "../../../actions/login";

class ChangePassword extends Component {
    handleSubmit = (values) => {

        let sendObject = {
            id: this.props.personalInfo.loggedData.id,
            password: values.currPass,
            newPassword: values.newPass,
        };


        console.log('========== PASSWORD CHANGES');
        console.log(sendObject);

        this.props.profileChangePassword(sendObject);

    }

    render () {

        let classIsLogged = (this.props.personalInfo.isLogged) ? null : 'd-none';
        let classNotLogged = (this.props.personalInfo.isLogged) ? 'd-none' : null;
        let isCorrectPassword = (this.props.personalInfo.errorStatus.errorProfileWrongPassword) ? 'incorrect-form-save' : 'd-none';


        return (
            <Fragment>

                <div className={classNotLogged}>
                    Please log in to system
                </div>
                <div className={classIsLogged}>

                    <div className={isCorrectPassword}>Please enter a correct old password</div>
                    <FormChangePassword onSubmit={this.handleSubmit}/>

                </div>


            </Fragment>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        personalInfo: state.login,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        profileChangePassword: (newForm) => dispatch(profileChangePassword(newForm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)