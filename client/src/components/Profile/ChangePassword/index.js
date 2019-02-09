import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

class ChangePassword extends Component {
    state = {
        currPass: '',
        newPass: '',
        newPass2: ''
    }

    onStateChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render () {

        let classIsLogged = (this.props.personalInfo.isLogged) ? null : 'd-none';
        let classNotLogged = (this.props.personalInfo.isLogged) ? 'd-none' : null;
        return (
            <Fragment>

                <div className={classNotLogged}>
                    Please log in to system
                </div>
                <div className={classIsLogged}>
                    <div className='section-profile-content-label'>
                        Current password
                    </div>
                    <input name='currPass' type="password" className='section-profile-content-input'
                           value={this.state.currPass} onChange={this.onStateChange}/>
                    <div className='section-profile-content-label'>
                        New password
                    </div>
                    <input name='newPass' type="password" className='section-profile-content-input'
                           value={this.state.newPass} onChange={this.onStateChange}/>
                    <div className='section-profile-content-label'>
                        Confirm new password
                    </div>
                    <input name='newPass2' type="password" className='section-profile-content-input'
                           value={this.state.newPass2} onChange={this.onStateChange}/>

                    <input type="button" className='section-profile-content-btn' value='Save password'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)