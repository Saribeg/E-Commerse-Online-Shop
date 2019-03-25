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
import TestAddToCart from "../Cart/testAddToCart";
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

import {blurSearchInput} from "../../actions/search";
import {
    CLOSE_MODAL_SUCCESS_ORDER,
    CLOSE_MODAL_UNSUCCESS_ORDER
} from "../../actions/cart";

class Dashboard extends Component {
    handleCloseForms = e => {
        if (
            this.props.windowsStatus.formLoginOpen ||
            this.props.windowsStatus.formRegisterOpen ||
            this.props.windowsStatus.loginDetails ||
            this.props.windowsStatus.formRegistrationOk ||
            this.props.focus ||
            this.props.checkoutWindows.successOrder ||
            this.props.checkoutWindows.unsuccessOrder

        ) {
            this.props.closeLoginForm();
            this.props.closeRegForm();
            this.props.closeLoginDetails();
            this.props.closeRegistrationOk();
            this.props.closeSuccessOrder();
            this.props.closeUnsuccessOrder();
            this.props.blurSearchInput(e);
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
                    <Route exact path="/addCart" component={TestAddToCart}/>
                    <Route exact path="/unsubscribe/:id" component={Unsubscribe}/>
                    <Route
                        exact
                        path="/:category/:subCategory/:furtherSubCategory?/:id(\d+)"
                        component={ProductPage}
                    />
                    <Route
                        exact
                        path="/:category/:subCategory?/:furtherSubCategory?"
                        component={FilteredProductList}
                    />
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
