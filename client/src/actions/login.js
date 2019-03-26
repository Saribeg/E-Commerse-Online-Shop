import axios from 'axios';

import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";


import {
    CLEAR_CART_ON_LOGOUT, SET_DATA_CART_FROM_DB, CART_FROM_LOCALSTORAGE_TO_DB,
    SET_CART_FROM_LOCALSTORAGE, SET_ID_LOGGED_USER, SET_INVALID_LOGIN, CLOSE_MODAL_UNSUCCESS_ORDER,
    OPEN_MODAL_FINISH_ORDER_AFTER_LOGIN, getCart
} from "./cart";
import store from "../store";


export const SET_LOGGED = 'SET_LOGGED';
export const LOGOUT = 'LOGOUT';
export const SEND_NEW_USER = 'SEND_NEW_USER';

export const OPEN_LOGIN_FORM = 'OPEN_LOGIN_FORM';
export const CLOSE_LOGIN_FORM = 'CLOSE_LOGIN_FORM';

export const OPEN_REG_FORM = 'OPEN_REG_FORM';
export const CLOSE_REG_FORM = 'CLOSE_REG_FORM';

export const OPEN_REG_OK_FORM = 'OPEN_REG_OK_FORM';
export const CLOSE_REG_OK_FORM = 'CLOSE_REG_OK_FORM';

export const OPEN_LOGIN_DETAILS = 'OPEN_LOGIN_DETAILS';
export const CLOSE_LOGIN_DETAILS = 'CLOSE_LOGIN_DETAILS';

export const EXIST_USER = 'EXIST_USER';
export const PROFILE_EXIST_EMAIL = 'PROFILE_EXIST_EMAIL';

export const CORRECT_LOGIN = 'CORRECT_LOGIN';
export const INCORRECT_LOGIN = 'INCORRECT_LOGIN';

export const PROFILE_CORRECT_PERSONAL_CHANGE = 'PROFILE_CORRECT_PERSONAL_CHANGE';

export const PROFILE_CORRECT_PASSWORD_CHANGE = 'PROFILE_CORRECT_PASSWORD_CHANGE';
export const PROFILE_INCORRECT_PASSWORD_CHANGE = 'PROFILE_INCORRECT_PASSWORD_CHANGE';

export const RESET_WINDOW_STATUS = 'RESET_WINDOW_STATUS';

export const SET_JWT_CURRENT_USER = 'SET_JWT_CURRENT_USER';
export const LOGOUT_JWT_CURRENT_USER = 'LOGOUT_JWT_CURRENT_USER';

export const SAVE_HISTORY_PATH = 'SAVE_HISTORY_PATH';


export function checkLoginCartOnStart() {
    if (localStorage.jwtToken) {
        //Set the auth token header auth
        setAuthToken(localStorage.jwtToken);
        //Decode token and get user info and exp
        const decoded = jwt_decode(localStorage.jwtToken);
        //Set user ans is isAuthenticated
        store.dispatch(setLoggedUser(decoded._doc));
        store.dispatch({
            type: SET_ID_LOGGED_USER,
            payload: {idUser: decoded._doc._id, mail: decoded._doc.email}
        });

        // store.dispatch(getCart({idUser: decoded._doc._id}));
        getCart({idUser: decoded._doc._id});

        //Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            //Logout user
            store.dispatch(unsetLoggedUser());
            //Clear the curren profile
            // store.dispatch(clearCurrentProfile());
            //Redirect to login
            window.location.href = "/";
        }
    } else if (localStorage.savedCart) {
        store.dispatch({
            type: SET_CART_FROM_LOCALSTORAGE,
            payload: {arrLS: JSON.parse(localStorage.savedCart)}
        });
    }


}


function checkSavedCart(userId) {

    if (localStorage.savedCart) {
        let sendObj = {
            userId: userId.idUser,
            arrLS: localStorage.savedCart
        }

        axios.post('/setSavedCart', sendObj)
            .then(res => res.data)
            .then(data => {
                    if (data.success) {
                        localStorage.removeItem("savedCart");
                        store.dispatch({type: CART_FROM_LOCALSTORAGE_TO_DB, payload: {infoDB: data.item}})
                    }

                }
            )

    } else {
        axios.post('/getCart', userId)
            .then(res => res.data)
            .then(data => {

                    if (data.success) {
                        let readyData = JSON.parse(data.infoDB);
                        // console.log('readyData', readyData)

                        store.dispatch({type: SET_DATA_CART_FROM_DB, payload: {infoDB: readyData}})
                    }

                }
            )
            .catch(err => console.log(err))
    }

}


export const setLoggedUser = decoded => {
    return {
        type: SET_JWT_CURRENT_USER,
        payload: decoded
    };
};

export const unsetLoggedUser = () => dispatch => {
    // Remove the token from local storage
    localStorage.removeItem("jwtToken");
    //Remove auth header for future requests
    setAuthToken(false);
    //Set the current user to an empty object
    // dispatch(setCurrentUser({}));
    dispatch({
        type: LOGOUT_JWT_CURRENT_USER,
    });
    dispatch({
        type: CLEAR_CART_ON_LOGOUT,
    });


};


export function goToProfile(history) {
    return dispatch => {
        // console.log('history')
        // console.log(history);
        axios.get('/users/profile')
            .then(res => res.data)
            .then(data => {
                    dispatch({type: CLOSE_LOGIN_DETAILS})
                }
            )
            .catch(err => {
                dispatch({type: CLOSE_LOGIN_DETAILS});

                history.push("/login")
                // window.location.href = "/login";
            })

    }
}


export function checkLoginBeforeCheckout(loginForm) {
    return dispatch => {
        axios.post('/users/login', loginForm)
            .then(res => res.data)
            .then(data => {
                    if (data.success === false) {
                        dispatch({type: SET_INVALID_LOGIN})
                    } else {

                        const {token} = data;
                        localStorage.setItem("jwtToken", token);
                        //Set token to Auth header
                        setAuthToken(token);
                        //Decode token to get user data
                        const decoded = jwt_decode(token);
                        //Set current user
                        dispatch(setLoggedUser(decoded._doc));

                        store.dispatch({
                            type: SET_ID_LOGGED_USER,
                            payload: {idUser: decoded._doc._id, mail: decoded._doc.email}
                        });

                        checkSavedCart({idUser: decoded._doc._id});

                        store.dispatch({type: CLOSE_MODAL_UNSUCCESS_ORDER});

                        store.dispatch({type: OPEN_MODAL_FINISH_ORDER_AFTER_LOGIN});


                        // const {token} = data;
                        // localStorage.setItem("jwtToken", token);
                        //Set token to Auth header
                        // setAuthToken(token);
                        //Decode token to get user data
                        // const decoded = jwt_decode(token);
                        //Set current user
                        // dispatch(setLoggedUser(decoded._doc));


                        // history.push(link);
                        // if login is succesfull then add and change info to store of redux
                    }
                }
            )
            .catch(err => console.log(err))
    }
}


export function checkRedirectLogin(loginForm, history, link) {
    return dispatch => {
        axios.post('/users/login', loginForm)
            .then(res => res.data)
            .then(data => {

                    if (data.success === false) {
                        dispatch({type: INCORRECT_LOGIN})
                    } else {

                        const {token} = data;
                        localStorage.setItem("jwtToken", token);
                        //Set token to Auth header
                        setAuthToken(token);
                        //Decode token to get user data
                        const decoded = jwt_decode(token);
                        //Set current user
                        dispatch(setLoggedUser(decoded._doc));
                        history.push(link);
                        // if login is succesfull then add and change info to store of redux
                    }
                }
            )
            .catch(err => console.log(err))
    }
}


export function checkLogin(loginForm) {
    return dispatch => {
        axios.post('/users/login', loginForm)
            .then(res => res.data)
            .then(data => {

                    if (data.success === false) {
                        dispatch({type: INCORRECT_LOGIN})
                    } else {
                        const {token} = data;
                        localStorage.setItem("jwtToken", token);
                        //Set token to Auth header
                        setAuthToken(token);
                        //Decode token to get user data
                        const decoded = jwt_decode(token);
                        //Set current user
                        dispatch(setLoggedUser(decoded._doc));

                        store.dispatch({
                            type: SET_ID_LOGGED_USER,
                            payload: {idUser: decoded._doc._id, mail: decoded._doc.email}
                        });

                        checkSavedCart({idUser: decoded._doc._id});

                        // if login is succesfull then add and change info to store of redux
                    }
                }
            )
            .catch(err => console.log(err))
    }
}


export function addNewUser(regForm) {
    return dispatch => {

        axios.post('/users/register', regForm)
            .then(res => res.data)
            .then(data => {

                    if (data.result === false) {
                        // if email is already used then show in form Message
                        dispatch({type: EXIST_USER})
                    } else if (data.firstName) {
                        // if registration is successfull - close window
                        dispatch({type: RESET_WINDOW_STATUS})
                        dispatch({type: OPEN_REG_OK_FORM})
                    }
                }
            )
            .catch(err => console.log(err))
    }
}


export function profileChangePersonal(regForm) {
    return dispatch => {
        axios.post('/users/update-profile/personal-info', regForm)
            .then(res => res.data)
            .then(data => {
                    if (data.status === 'exist-email') {
                        // if email is already used then show in form Message
                        dispatch({type: PROFILE_EXIST_EMAIL})
                    } else {
                        // if registration is successfull - close window
                        dispatch({
                            type: PROFILE_CORRECT_PERSONAL_CHANGE,
                            payload: {userinfo: data.userinfo}
                        })
                    }
                }
            )
            .catch(err => console.log(err))
    }
}


export function profileChangePassword(regForm) {
    return dispatch => {
        axios.post('/users/update-profile/password', regForm)
            .then(res => res.data)
            .then(data => {

                    if (data.status === 'incorrect-password') {
                        // if email is already used then show in form Message
                        dispatch({type: PROFILE_INCORRECT_PASSWORD_CHANGE})
                    } else {
                        // if registration is successfull - close window
                        dispatch({
                            type: PROFILE_CORRECT_PASSWORD_CHANGE,
                        })
                    }
                }
            )
            .catch(err => console.log(err))
    }
}
