import {SET_LOGGED} from '../../actions/login'

const initialState = {
    isLogged: false,
    loggedData: {
        id: '',
        name: '',
    }

}

function login(state = initialState, action) {

    switch (action.type) {
        case SET_LOGGED:
            return {...state}
        default:
            return {...state}

    }
}

export default login