import axios from 'axios';

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

export function checkLogin(loginForm) {
    return dispatch => {
        console.log ('check login');

        axios.post('/users/login', loginForm)
            .then(res => res.data)
            .then(data => {
                //check data from BACKEND. If we get FALSE - then add field in form
                    if (data.result === false) {
                        console.log('incorrect login');
                        dispatch({type: INCORRECT_LOGIN})
                    } else if (data.firstName) {

                        // if login is succesfull then add and change info to store of redux
                        dispatch({type: RESET_WINDOW_STATUS})
                        dispatch({
                            type: CORRECT_LOGIN,
                            payload: {userinfo: data}
                        })

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

        console.log('HI update axios')

        axios.post('/users/update-profile/personal-info', regForm)
            .then(res => res.data)
            .then(data => {

                    if (data.status === 'exist-email') {
                        // if email is already used then show in form Message
                        console.log('========= exist mail FRONT')
                        dispatch({type: PROFILE_EXIST_EMAIL})
                    } else {
                        console.log('========= update ok FRONT')
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

        console.log('HI update axios')

        axios.post('/users/update-profile/password', regForm)
            .then(res => res.data)
            .then(data => {

                    if (data.status === 'incorrect-password') {
                        // if email is already used then show in form Message
                        console.log('========= incorrect password FRONT')
                        dispatch({type: PROFILE_INCORRECT_PASSWORD_CHANGE})
                    } else {
                        console.log('========= update ok FRONT')
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
