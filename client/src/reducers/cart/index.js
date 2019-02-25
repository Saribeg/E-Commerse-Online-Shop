import { ADD_ITEM_TO_CART, CHANGE_AMOUT_OF_ITEM } from '../../actions/cart'


const initialState = {

    amountInBasket: 0,
    idUser: '',
    idOrderInDB: '',
    arrayProduct: [],
    arrayCheckout: [],
}

function countAmount (array) {
    let count = 0;
    array.forEach((elem) => {
        count = count + elem.amount;
    })
    return count
}

function cart(state = initialState, action) {

    switch (action.type) {


        case ADD_ITEM_TO_CART:
            let arrProd = state.arrayProduct;
            arrProd.push(action.payload.item);

            return {
                ...state,
                arrayProduct: arrProd,
                amountInBasket: countAmount(arrProd),

            }
        case CHANGE_AMOUT_OF_ITEM:
            let changeAmountProd = state.arrayProduct;
            changeAmountProd[action.payload.index].amount = action.payload.value;

            return {
                ...state,
                arrayProduct: changeAmountProd,
                amountInBasket: countAmount(changeAmountProd),
            }

        default:
            return {...state}
    }
}


export default cart