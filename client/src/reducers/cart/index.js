import {
    ADD_ITEM_TO_CART, CHANGE_AMOUT_OF_ITEM, SET_CART_FROM_LOCALSTORAGE,
    SET_ID_LOGGED_USER, SET_ID_CART_FROM_DB, SET_DATA_CART_FROM_DB,
    CLEAR_CART_ON_LOGOUT, CART_FROM_LOCALSTORAGE_TO_DB,
    addNewCart, updateCart
} from '../../actions/cart'


const initialState = {

    amountInBasket: 0,
    idUser: '',
    idCartInDB: '',
    arrayProduct: [],
    arrayCheckout: [],
}

function setLocalSrorage(arr) {
    localStorage.setItem("savedCart", JSON.stringify(arr));
}

function countAmount(array) {
    console.log('call countAmount')

    let count = 0;
    if (array) {
        array.forEach((elem) => {
            count = count + elem.amount;
        })
    }


    return count
}

function saveInDB(state) {
    let sendObj = {
        idUser: state.idUser,
        arrayProduct: JSON.stringify(state.arrayProduct)
    };
    addNewCart(sendObj);

}


function updateInDB(state) {
    let sendObj = {
        idCartInDB: state.idCartInDB,
        arrayProduct: JSON.stringify(state.arrayProduct)
    };


    updateCart(sendObj);

}

function cart(state = initialState, action) {

    switch (action.type) {

        case SET_ID_LOGGED_USER:

            return {
                ...state,
                idUser: action.payload.idUser,
            }

        case SET_ID_CART_FROM_DB:

            return {
                ...state,
                idCartInDB: action.payload.idCartInDB
            }

        case SET_DATA_CART_FROM_DB:

            return {
                ...state,
                idCartInDB: action.payload.infoDB._id,
                idUser: action.payload.infoDB.idUser,
                arrayProduct: action.payload.infoDB.arrayProduct,
                amountInBasket: countAmount(action.payload.infoDB.arrayProduct),
            }

        case CART_FROM_LOCALSTORAGE_TO_DB:

            return {
                ...state,
                idCartInDB: action.payload.infoDB._id,
                idUser: action.payload.infoDB.idUser,
                arrayProduct: action.payload.infoDB.arrayProduct,
                amountInBasket: countAmount(action.payload.infoDB.arrayProduct),
            }

        case CLEAR_CART_ON_LOGOUT:

            return {
                amountInBasket: 0,
                idUser: '',
                idCartInDB: '',
                arrayProduct: [],
                arrayCheckout: [],
            }

        case ADD_ITEM_TO_CART:
            let arrProd = state.arrayProduct;
            arrProd.push(action.payload.item);

            if (state.idUser) {
                if (state.idCartInDB) {
                    updateInDB(state);
                } else {
                    saveInDB(state);
                }
            } else {
                setLocalSrorage(arrProd);
            }


            return {
                ...state,
                arrayProduct: arrProd,
                amountInBasket: countAmount(arrProd),

            }
        case CHANGE_AMOUT_OF_ITEM:
            let changeAmountProd = state.arrayProduct;
            changeAmountProd[action.payload.index].amount = action.payload.value;

            if (state.idUser) {
                if (state.idCartInDB) {
                    updateInDB(state);
                } else {
                    saveInDB(state);
                }
            } else {
                setLocalSrorage(arrProd);
            }
            return {
                ...state,
                arrayProduct: changeAmountProd,
                amountInBasket: countAmount(changeAmountProd),
            }

        case SET_CART_FROM_LOCALSTORAGE:

            return {
                ...state,
                arrayProduct: action.payload.arrLS,
                amountInBasket: countAmount(action.payload.arrLS),
            }

        default:
            return {...state}
    }
}


export default cart