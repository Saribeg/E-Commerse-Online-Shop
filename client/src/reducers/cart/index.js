import {
    ADD_ITEM_TO_CART, CHANGE_AMOUT_OF_ITEM, SET_CART_FROM_LOCALSTORAGE,
    SET_ID_LOGGED_USER, SET_ID_CART_FROM_DB, SET_DATA_CART_FROM_DB,
    CLEAR_CART_ON_LOGOUT, CART_FROM_LOCALSTORAGE_TO_DB, DELETE_ITEM_TO_CART,
    CHANGE_ARRAY_AMOUT_OF_ITEM, UPDATE_STORE_AFTER_CHECK_IN_DB,
    addNewCart, updateCart
} from '../../actions/cart'


const initialState = {

    amountInBasket: 0,
    idUser: '',
    idCartInDB: '',
    arrayProduct: [],
    arrayCheckout: [],
}

function setLocalStorage(arr) {
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

function saveInDB(id, arr) {
    let sendObj = {
        idUser: id,
        arrayProduct: JSON.stringify(arr)
    };
    addNewCart(sendObj);

}


function updateInDB(id, arr) {

    let sendObj = {
        idCartInDB: id,
        arrayProduct: JSON.stringify(arr)
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

        case DELETE_ITEM_TO_CART:

            if (state.idUser) {
                if (state.idCartInDB) {
                    updateInDB(state.idCartInDB, action.payload.array);
                } else {
                    saveInDB(state.idUser, action.payload.array);
                }
            } else {
                setLocalStorage(action.payload.array);
            }


            return {
                ...state,
                arrayProduct: action.payload.array,
                amountInBasket: countAmount(action.payload.array),
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
            let arrProd = [];
            state.arrayProduct.forEach((elem, index) => {
                arrProd[index] = {...elem}
            });

            arrProd.push(action.payload.item);

            if (state.idUser) {
                if (state.idCartInDB) {
                    updateInDB(state.idCartInDB, arrProd);
                } else {
                    saveInDB(state.idUser, arrProd);
                }
            } else {
                setLocalStorage(arrProd);
            }

            return {
                ...state,
                arrayProduct: arrProd,
                amountInBasket: countAmount(arrProd),

            }

        case CHANGE_ARRAY_AMOUT_OF_ITEM:


            let changeArrayAmountProd = [];
            state.arrayProduct.forEach((elem, index) => {
                changeArrayAmountProd[index] = {...elem}
            });

            changeArrayAmountProd.forEach((elem, index) => {
                elem.amount = action.payload.obj[index]
            })

            // changeArrayAmountProd[action.payload.index].amount = action.payload.value;


            if (state.idUser) {
                if (state.idCartInDB) {
                    updateInDB(state.idCartInDB, changeArrayAmountProd);
                } else {
                    saveInDB(state.idUser, changeArrayAmountProd);
                }
            } else {
                setLocalStorage(changeArrayAmountProd);
            }
            return {
                ...state,
                arrayProduct: changeArrayAmountProd,
                amountInBasket: countAmount(changeArrayAmountProd),
            }


        case CHANGE_AMOUT_OF_ITEM:
            let changeAmountProd = [];
            state.arrayProduct.forEach((elem, index) => {
                changeAmountProd[index] = {...elem}
            });

            changeAmountProd[action.payload.index].amount = action.payload.value;

            // console.log('changeAmountProd', changeAmountProd)

            if (state.idUser) {
                if (state.idCartInDB) {
                    updateInDB(state.idCartInDB, changeAmountProd);
                } else {
                    saveInDB(state.idUser, changeAmountProd);
                }
            } else {
                setLocalStorage(changeAmountProd);
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

        case UPDATE_STORE_AFTER_CHECK_IN_DB:
            let changeAfterCheck = [];
            state.arrayProduct.forEach((elem, index) => {
                changeAfterCheck[index] = {
                    ...elem,
                    id: action.payload.newArr[index].id,
                    isAvailable: action.payload.newArr[index].isAvailable,
                    reasonNotAvailable: action.payload.newArr[index].reasonNotAvailable,
                    colorName: action.payload.newArr[index].colorName,
                    size: action.payload.newArr[index].size,
                    amount: action.payload.newArr[index].amount,
                    priceFormDB: action.payload.newArr[index].priceFormDB,

                }
            });

            if (state.idUser) {
                if (state.idCartInDB) {
                    updateInDB(state.idCartInDB, changeAfterCheck);
                } else {
                    saveInDB(state.idUser, changeAfterCheck);
                }
            } else {
                setLocalStorage(changeAfterCheck);
            }

            return {
                ...state,
                arrayProduct: changeAfterCheck,
                amountInBasket: countAmount(changeAfterCheck),
            }

        default:
            return {...state}
    }
}


export default cart