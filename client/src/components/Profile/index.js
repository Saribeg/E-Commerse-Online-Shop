import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom';
import {LOGOUT} from '../../actions/login'

import './Profile.scss'

import PersonalContent from './PersonalContent';
import DeliveryInfo from './DeliveryInfo';
import ChangePassword from './ChangePassword';
import PaymentDetails from './PaymentDetails';


class Profile extends Component {
    render() {

        return (
            <section className='section-profile'>
                <div className='section-profile-title'>
                    <div className='container'>
                        <div className='section-profile-title-text'>
                            my account
                        </div>
                    </div>
                </div>

                <div className='section-profile-main container'>
                    <div className='section-profile-navmenu'>
                        <NavLink to='/users/profile/personalContent' className='section-profile-navmenu-item'
                                 activeClassName='section-profile-navmenu-item-active'>
                            Personal Information
                        </NavLink>
                        <NavLink to='/users/profile/changePassword' className='section-profile-navmenu-item'
                                 activeClassName='section-profile-navmenu-item-active'>
                            Change Password
                        </NavLink>
                        <NavLink to='/users/profile/deliveryInfo' className='section-profile-navmenu-item'
                                 activeClassName='section-profile-navmenu-item-active'>
                            Delivery Information
                        </NavLink>
                        <NavLink to='/users/profile/paymentDetails' className='section-profile-navmenu-item'
                                 activeClassName='section-profile-navmenu-item-active'>
                            Payment Information
                        </NavLink>
                        <NavLink to='/' className='section-profile-navmenu-logout' onClick={() => this.props.logout()}>
                            Logout
                        </NavLink>

                    </div>

                    <div className='section-profile-content'>
                        <Route exact path='/users/profile/personalContent' component={PersonalContent}/>
                        <Route exact path='/users/profile/changePassword' component={ChangePassword}/>
                        <Route exact path='/users/profile/deliveryInfo' component={DeliveryInfo}/>
                        <Route exact path='/users/profile/paymentDetails' component={PaymentDetails}/>

                    </div>
                </div>


            </section>
        )

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch({type: LOGOUT})
        }

    }
}

export default connect(null, mapDispatchToProps)(Profile)