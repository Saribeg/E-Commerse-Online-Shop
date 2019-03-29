import {
    SET_LOGGED, SEND_NEW_USER, OPEN_LOGIN_FORM, CLOSE_LOGIN_FORM,
    OPEN_REG_FORM, CLOSE_REG_FORM, EXIST_USER, RESET_WINDOW_STATUS, INCORRECT_LOGIN,
    CORRECT_LOGIN, OPEN_LOGIN_DETAILS, CLOSE_LOGIN_DETAILS, LOGOUT, PROFILE_EXIST_EMAIL,
    PROFILE_CORRECT_PERSONAL_CHANGE, PROFILE_CORRECT_PASSWORD_CHANGE,
    PROFILE_INCORRECT_PASSWORD_CHANGE, SET_JWT_CURRENT_USER, LOGOUT_JWT_CURRENT_USER,
    SAVE_HISTORY_PATH, OPEN_REG_OK_FORM, CLOSE_REG_OK_FORM
} from '../../actions/login'

const initialState = {
    isLogged: false,
    historyPath: '',
    loggedData: {
        id: '',
        firstName: '',
        secondName: '',
        email: '',
        isAdmin: false,
        deliveryData: {
            country: '',
            zipcode: '',
            city: '',
            street: '',
            phone: ''

        },
        paymentInfo: {
            cardNumber: '',
            nameOnCard: '',
            expiryMonth: '',
            expiryYear: ''
        }
    },
    windowsStatus: {
        formLoginOpen: false,
        formRegisterOpen: false,
        formRegistrationOk: false,
        loginDetails: false,
        successRegister: false,
        invalidLogin: false,
        existEmail: false,
    },
    errorStatus: {
        errorProfileExistEmail: false,
        errorProfileWrongPassword: false

    }
}

function login(state = initialState, action) {

    switch (action.type) {
        case SET_LOGGED:
            return {...state}

        case SAVE_HISTORY_PATH:
            return {
                ...state,
                historyPath: action.payload.link,
            }

        case SET_JWT_CURRENT_USER:
            return {
                ...state,
                isLogged: true,
                loggedData: {...action.payload},
                windowsStatus: {
                    formLoginOpen: false,
                    formRegisterOpen: false,
                    formRegistrationOk: false,
                    loginDetails: false,
                    successRegister: false,
                    invalidLogin: false,
                    existEmail: false,
                },

            }
        case LOGOUT_JWT_CURRENT_USER:
            return {
                ...state,
                isLogged: false,
                loggedData: {
                    id: '',
                    firstName: '',
                    secondName: '',
                    email: '',
                    isAdmin: false,
                    deliveryData: {
                        country: '',
                        zipcode: '',
                        city: '',
                        street: '',
                        phone: ''

                    },
                    paymentInfo: {
                        cardNumber: '',
                        nameOnCard: '',
                        expiryMonth: '',
                        expiryYear: ''
                    }
                },
                windowsStatus: {
                    formLoginOpen: false,
                    formRegisterOpen: false,
                    formRegistrationOk: false,
                    loginDetails: false,
                    successRegister: false,
                    invalidLogin: false,
                    existEmail: false,
                },
            }

        case SEND_NEW_USER:
            return {...state}

        case OPEN_LOGIN_FORM:
            return {
                ...state,
                windowsStatus: {
                    ...state.windowsStatus,
                    formLoginOpen: true,
                }
            }
        case CLOSE_LOGIN_FORM:
            return {
                ...state,
                windowsStatus: {
                    ...state.windowsStatus,
                    formLoginOpen: false,
                }
            }
        case OPEN_LOGIN_DETAILS:
            return {
                ...state,
                windowsStatus: {
                    ...state.windowsStatus,
                    loginDetails: true,
                }
            }
        case CLOSE_LOGIN_DETAILS:
            return {
                ...state,
                windowsStatus: {
                    ...state.windowsStatus,
                    loginDetails: false,
                }
            }
        case OPEN_REG_FORM:
            return {
                ...state,
                windowsStatus: {
                    ...state.windowsStatus,
                    formRegisterOpen: true,
                }
            }
        case CLOSE_REG_FORM:
            return {
                ...state,
                windowsStatus: {
                    ...state.windowsStatus,
                    formRegisterOpen: false,
                    // formRegistrationOk: true,
                }
            }

        case OPEN_REG_OK_FORM:
            return {
                ...state,
                windowsStatus: {
                    ...state.windowsStatus,
                    formRegisterOpen: false,
                    formRegistrationOk: true,
                }
            }
        case CLOSE_REG_OK_FORM:
            return {
                ...state,
                windowsStatus: {
                    ...state.windowsStatus,
                    formRegistrationOk: false,
                }
            }

        case EXIST_USER:
            return {
                ...state,
                windowsStatus: {
                    ...state.windowsStatus,
                    existEmail: true,
                }
            }
        case PROFILE_EXIST_EMAIL:
            return {
                ...state,
                errorStatus: {
                    ...state.errorStatus,
                    errorProfileExistEmail: true,
                }
            }



        case PROFILE_INCORRECT_PASSWORD_CHANGE:
            return {
                ...state,
                errorStatus: {
                    ...state.errorStatus,
                    errorProfileWrongPassword: true,
                }
            }
        case PROFILE_CORRECT_PASSWORD_CHANGE:
            return {
                ...state,
                errorStatus: {
                    ...state.errorStatus,
                    errorProfileWrongPassword: false,
                }
            }



        case PROFILE_CORRECT_PERSONAL_CHANGE:
            return {
                ...state,
                windowsStatus: {
                    formLoginOpen: false,
                    formRegisterOpen: false,
                    successRegister: false,
                    formRegistrationOk: false,
                    invalidLogin: false,
                    existEmail: false,
                },
                isLogged: true,
                loggedData: {
                    id: action.payload.userinfo._id,
                    firstName: action.payload.userinfo.firstName,
                    secondName: action.payload.userinfo.secondName,
                    email: action.payload.userinfo.email,
                    isAdmin: action.payload.userinfo.isAdmin,
                    deliveryData: {...action.payload.userinfo.deliveryData},
                    paymentInfo: {...action.payload.userinfo.paymentInfo},
                },
                errorStatus: {
                    ...state.errorStatus,
                    errorProfileExistEmail: false,

                }
            }



        case INCORRECT_LOGIN:
            return {
                ...state,
                windowsStatus: {
                    ...state.windowsStatus,
                    invalidLogin: true,
                }
            }
        case CORRECT_LOGIN:
            return {
                ...state,
                windowsStatus: {
                    formLoginOpen: false,
                    formRegisterOpen: false,
                    formRegistrationOk: false,
                    successRegister: false,
                    invalidLogin: false,
                    existEmail: false,
                },
                isLogged: true,
                loggedData: {
                    id: action.payload.userinfo._id,
                    firstName: action.payload.userinfo.firstName,
                    secondName: action.payload.userinfo.secondName,
                    email: action.payload.userinfo.email,
                    isAdmin: action.payload.userinfo.isAdmin,
                    deliveryData: {...action.payload.userinfo.deliveryData},
                    paymentInfo: {...action.payload.userinfo.paymentInfo},
                },
                errorStatus: {
                    ...state.errorStatus,
                    errorProfileExistEmail: false,

                }

            }

        case LOGOUT:
            return {
                ...state,
                windowsStatus: {
                    formLoginOpen: false,
                    formRegisterOpen: false,
                    formRegistrationOk: false,
                    successRegister: false,
                    invalidLogin: false,
                    existEmail: false,
                },
                isLogged: false,
                loggedData: {
                    id: '',
                    name: '',
                    email: '',
                    isAdmin: false,
                },
                errorStatus: {
                    ...state.errorStatus

                }

            }
        case RESET_WINDOW_STATUS:
            return {
                ...state,
                windowsStatus: {
                    formLoginOpen: false,
                    formRegisterOpen: false,
                    formRegistrationOk: false,
                    successRegister: false,
                    invalidLogin: false,
                    existEmail: false,
                }
            }
        default:
            return {...state}

    }
}

export default login