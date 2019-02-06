import {SET_LOGGED, SEND_NEW_USER, OPEN_LOGIN_FORM, CLOSE_LOGIN_FORM,
    OPEN_REG_FORM, CLOSE_REG_FORM, EXIST_USER, RESET_WINDOW_STATUS, INCORRECT_LOGIN, CORRECT_LOGIN} from '../../actions/login'

const initialState = {
    isLogged: false,
    loggedData: {
        id: '',
        name: '',
        email: '',
    },
    windowsStatus: {
        formLoginOpen: false,
        formRegisterOpen: false,
        successRegister: false,
        invalidLogin: false,
        existEmail: false,
    }
}

function login(state = initialState, action) {

    switch (action.type) {
        case SET_LOGGED:
            return {...state}
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
                windowsStatus: {
                    formLoginOpen: false,
                    formRegisterOpen: false,
                    successRegister: false,
                    invalidLogin: false,
                    existEmail: false,
                },
                isLogged: true,
                loggedData: {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                }

            }
        case RESET_WINDOW_STATUS:
            return {
                ...state,
                windowsStatus: {
                    formLoginOpen: false,
                    formRegisterOpen: false,
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