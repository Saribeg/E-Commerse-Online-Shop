import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

// import {CLOSE_LOGIN_DETAILS} from "../../../actions/login";


class PersonalContent extends Component {
    state = {
        firstName: '',
        secondName: '',
        email: '',
    }

    onStateChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    componentWillMount () {
        if (this.props.personalInfo.isLogged) {
            this.setState({
                firstName: this.props.personalInfo.loggedData.firstName,
                secondName: this.props.personalInfo.loggedData.secondName,
                email: this.props.personalInfo.loggedData.email,
            })
        }
    }


    render() {


        let classIsLogged = (this.props.personalInfo.isLogged) ? null : 'd-none';
        let classNotLogged = (this.props.personalInfo.isLogged) ? 'd-none' : null;

        return (
            <Fragment>
                <div className={classNotLogged}>
                    Please log in to system
                </div>

                <div className={classIsLogged}>
                    <div>
                        <div className='section-profile-content-label'>
                            First name
                        </div>
                        <input name='firstName' type="text" className='section-profile-content-input'
                               value={this.state.firstName} onChange={this.onStateChange}/>
                        <div className='section-profile-content-label'>
                            Last name
                        </div>
                        <input name='secondName' type="text" className='section-profile-content-input'
                               value={this.state.secondName} onChange={this.onStateChange}/>
                        <div className='section-profile-content-label'>
                            Email address
                        </div>
                        <input name='email' type="text" className='section-profile-content-input'
                               value={this.state.email} onChange={this.onStateChange}/>

                        <input type="button" className='section-profile-content-btn' value='Save changes'/>

                    </div>
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalContent)