import React, {Component} from "react";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import MainPage from "../MainPage";
import ProductPage from "../ProductPage";
import Profile from "../Profile";
import Unsubscribe from "../Unsubscribe";
import Cart from "../Cart";
import Checkout from "../Checkout";
import FilteredProductList from "../FilteredProductList";
import AboutUs from "../StaticPages/AboutUs";
import OurPolicy from "../StaticPages/OurPolicy";
import Careers from "../StaticPages/Careers";

import {
    CLOSE_LOGIN_DETAILS,
    CLOSE_LOGIN_FORM,
    CLOSE_REG_FORM,
    CLOSE_REG_OK_FORM
} from "../../actions/login";

import {
    SET_OFFSET_Y
} from "../../actions/scroll";

import {blurSearchInput} from "../../actions/search";
import {
    CLOSE_MODAL_SUCCESS_ORDER,
    CLOSE_MODAL_UNSUCCESS_ORDER
} from "../../actions/cart";

class Dashboard extends Component {

    componentDidMount () {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        console.log('========scroll', window.pageYOffset)
        this.props.setOffsetY(window.pageYOffset)
    }


    handleCloseForms = e => {
        if (this.props.windowsStatus.formLoginOpen) {
            this.props.closeLoginForm();
            document.body.style.overflow="auto";
        }
        if (this.props.windowsStatus.formRegisterOpen) {
            this.props.closeRegForm();
            document.body.style.overflow="auto";
        }
        if (this.props.windowsStatus.loginDetails) {
            this.props.closeLoginDetails();
            document.body.style.overflow="auto";
        }
        if (this.props.windowsStatus.formRegistrationOk) {
            this.props.closeRegistrationOk();
            document.body.style.overflow="auto";
        }
        if (this.props.focus) {
            this.props.blurSearchInput(e);
            document.body.style.overflow="auto";
        }
        if (this.props.checkoutWindows.successOrder) {
            this.props.closeSuccessOrder();
            document.body.style.overflow="auto";
        }
        if (this.props.checkoutWindows.unsuccessOrder) {
            this.props.closeUnsuccessOrder();
            document.body.style.overflow="auto";
        }

    };

    render() {



        return (
            <div onClick={this.handleCloseForms}>
                <Header/>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/about-us" component={AboutUs}/>
                    <Route exact path="/our-policy" component={OurPolicy}/>
                    <Route exact path="/careers" component={Careers}/>
                    <Route path="/users/profile" component={Profile}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route exact path="/cart" component={Cart}/>
                    <Route exact path="/unsubscribe/:id" component={Unsubscribe}/>
                    <Route exact path="/:category/:subCategory/:furtherSubCategory?/:id(\d+)" component={ProductPage}/>
                    <Route exact path="/:category/:subCategory?/:furtherSubCategory?" component={FilteredProductList}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        windowsStatus: state.login.windowsStatus,
        focus: state.search.focus,
        checkoutWindows: state.cart.windows
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeLoginForm: () => {
            dispatch({type: CLOSE_LOGIN_FORM});
        },
        closeLoginDetails: () => {
            dispatch({type: CLOSE_LOGIN_DETAILS});
        },
        closeRegForm: () => {
            dispatch({type: CLOSE_REG_FORM});
        },
        closeRegistrationOk: () => {
            dispatch({type: CLOSE_REG_OK_FORM});
        },

        blurSearchInput: e => dispatch(blurSearchInput(e)),
        closeSuccessOrder: () => {
            dispatch({type: CLOSE_MODAL_SUCCESS_ORDER});
        },
        closeUnsuccessOrder: () => {
            dispatch({type: CLOSE_MODAL_UNSUCCESS_ORDER});
        },
        setOffsetY: (value) => {
            dispatch({type: SET_OFFSET_Y, payload: {value: value}})
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
