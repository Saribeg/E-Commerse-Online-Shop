import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import FormPersonalContent from './FormPersonalContent'

import {profileChangePersonal} from "../../../actions/login";


class PersonalContent extends Component {


    handleSubmit = (values) => {

        let sendObject = {
            id: this.props.personalInfo.loggedData.id,
            firstName: values.firstName,
            secondName: values.secondName,
            email: values.email,
        };

        this.props.profileChangePersonal(sendObject);

    }

    render() {


        let classIsLogged = (this.props.personalInfo.isLogged) ? null : 'd-none';
        let classNotLogged = (this.props.personalInfo.isLogged) ? 'd-none' : null;

        let isNewEmailUser = (this.props.personalInfo.errorStatus.errorProfileExistEmail) ? 'incorrect-form-save' : 'd-none';

        return (
            <Fragment>
                <div className={classNotLogged}>
                    Please log in to system
                </div>

                <div className={classIsLogged}>

                    <div className={isNewEmailUser}>You new email is already user. Data wasn't save.</div>
                    <FormPersonalContent onSubmit={this.handleSubmit}/>

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
        profileChangePersonal: (newForm) => dispatch(profileChangePersonal(newForm))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalContent)