import {
    SET_OFFSET_Y
} from '../../actions/scroll'

const initialState = {
    position: 0
}

function scroll (state = initialState, action) {

    switch (action.type) {
        case SET_OFFSET_Y:
            return {
                position: action.payload.value
            }

        default:
            return {
                ...state
            }
    }
}

export default scroll