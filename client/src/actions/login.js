import axios from 'axios';
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const SET_LOGGED = 'SET_LOGGED';
export const LOGOUT = 'LOGOUT';
export const SEND_NEW_USER = 'SEND_NEW_USER';

export const OPEN_LOGIN_FORM = 'OPEN_LOGIN_FORM';
export const CLOSE_LOGIN_FORM = 'CLOSE_LOGIN_FORM';

export const OPEN_REG_FORM = 'OPEN_REG_FORM';
export const CLOSE_REG_FORM = 'CLOSE_REG_FORM';

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


};


export function goToProfile() {
    return dispatch => {
        console.log('dispatch profile')
        axios.get('/users/profile')
            .then(() => {
                console.log("GO TO PROFILE FRONT");
                dispatch({type: CLOSE_LOGIN_DETAILS})
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
                    //check data from BACKEND. If we get FALSE - then add field in form
                    // if (data.result === false) {
                    //     dispatch({type: INCORRECT_LOGIN})
                    // } else if (data.firstName) {
                    //     // if login is succesfull then add and change info to store of redux
                    //     dispatch({type: RESET_WINDOW_STATUS})
                    //     dispatch({
                    //         type: CORRECT_LOGIN,
                    //         payload: {userinfo: data}
                    //     })
                    //
                    // }
                    if (data.success === false) {
                        dispatch({type: INCORRECT_LOGIN})
                    } else {
                        const { token } = data;
                        console.log('TOKEN')
                        console.log(token);
                        localStorage.setItem("jwtToken", token);
                        //Set token to Auth header
                        setAuthToken(token);
                        //Decode token to get user data
                        const decoded = jwt_decode(token);
                        console.log(decoded._doc);
                        //Set current user
                        dispatch(setLoggedUser(decoded._doc));

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
                        dispatch({type: CLOSE_REG_FORM})
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
