import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import {OPEN_LOGIN_FORM} from '../../actions/login'

import './TopBlockAuth.scss'


class TopBlockAuth extends Component {

    render() {

        let classLoginForm = (this.props.windowsStatus.formLoginOpen) ? null : 'd-none';


        let classRegistrationForm = (this.props.windowsStatus.formRegisterOpen) ? null : 'd-none';

        let isLogged = (this.props.login.isLogged) ? null : 'd-none';



        return (

            <div className="main-right">

                <input type="text" className="main-search" placeholder="Search"/>
                <div className="main-date">
                    <div>
                        <img src="/img/location.png" alt=""/>
                    </div>
                    <div className={isLogged}>
                        {this.props.login.loggedData.name}
                    </div>
                    <div>
                        <img src="/img/account.png" alt="" onClick={() => this.props.openLoginForm()}/>
                    </div>
                    <div>
                        <img src="/img/basket.png" alt=""/>
                    </div>
                </div>

                <div className={classLoginForm}>
                    <LoginForm />
                </div>

                <div className={classRegistrationForm}>
                    <RegistrationForm />
                </div>


            </div>


        )
    }
}


const mapStateToProps = (state) => {
    return {
        windowsStatus: state.login.windowsStatus,
        login: state.login,
}
}

const mapDispatchToProps = (dispatch) => {
    return {
        openLoginForm: () => {
            dispatch({type: OPEN_LOGIN_FORM})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBlockAuth);