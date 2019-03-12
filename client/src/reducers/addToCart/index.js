import {
    SET_INITIAL_STATE_ADD_CART, SET_COLOR, SET_SIZE, SET_AMOUNT, SET_IMG
} from '../../actions/addToCart'


const initialState = {
    id: "",
    isAvailable: true,
    reasonNotAvailable: "",
    model: "",
    colorName: "",
    size: "",
    amount: 1,
    availableAmount: 0,
    price: 0,
    priceFormDB: 0,
    urlPhoto: ""
}


function addToCart(state = initialState, action) {

    switch (action.type) {

        case SET_INITIAL_STATE_ADD_CART:
            return {
                ...state,
                ...action.payload.data
            }

        case SET_COLOR:
            return {
                ...state,
                colorName: action.payload.color
            }
        case SET_IMG:
            return {
                ...state,
                urlPhoto: action.payload.url
            }
        case SET_SIZE:
            return {
                ...state,
                size: action.payload.size
            }
        case SET_AMOUNT:
            return {
                ...state,
                amount: action.payload.amount
            }
        default:
            return {...state}
    }
}


export default addToCart