import React, {Component} from 'react';
import {NavLink, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
// import {Route} from 'react-router-dom';
// import { withRouter } from "react-router-dom";
import {goToProfile, LOGOUT, SAVE_HISTORY_PATH} from '../../actions/login'


import PersonalContent from './PersonalContent';
import DeliveryInfo from './DeliveryInfo';
import ChangePassword from './ChangePassword';
import PaymentDetails from './PaymentDetails';
import OrdersHistory from './OrdersHistory';

import './Profile.scss'



class Profile extends Component {

    componentDidMount() {

        console.log('this.props.history.location.pathname', this.props.history.location.pathname)

        this.props.setHistoryLink(this.props.history.location.pathname);
        this.props.goToProfile(this.props.history)
    }


    render() {

        console.log('render profile')


        return (
            <>
            <Helmet>
			<title>My account</title>
			</Helmet>
            <section className='section-profile'>
                <div className='section-profile-title'>
                    <div className='container'>
                        <div className='section-profile-title-text'>
                            My account
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
                        <NavLink to='/users/profile/ordersHistory' className='section-profile-navmenu-item'
                                 activeClassName='section-profile-navmenu-item-active'>
                            My Orders
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
                        <Route exact path='/users/profile/ordersHistory' component={OrdersHistory}/>
                    </div>
                </div>


            </section>
            </>
        )

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch({type: LOGOUT})
        },
        setHistoryLink: (value) => {
            dispatch({type: SAVE_HISTORY_PATH, payload: {link: value}})
        },
        goToProfile: (history) => dispatch(goToProfile(history)),

    }
}

export default connect(null, mapDispatchToProps)(withRouter(Profile))