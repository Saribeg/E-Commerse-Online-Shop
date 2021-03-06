import {
  ADD_ITEM_TO_CART,
  SET_CART_FROM_LOCALSTORAGE,
  SET_ID_LOGGED_USER,
  SET_ID_CART_FROM_DB,
  SET_DATA_CART_FROM_DB,
  CLEAR_CART_ON_LOGOUT,
  CART_FROM_LOCALSTORAGE_TO_DB,
  DELETE_ITEM_TO_CART,
  UPDATE_STORE_AFTER_CHECK_IN_DB,
  CHANGE_CHECK_AMOUT_OF_ITEM,
  CHANGE_DELIVERY_METHOD,
  SET_FINISHED_CART,
  SET_DEFAULT_FINISHED_CART,
  addNewCart,
  updateCart,
  updateCartIsFinished,
  CLOSE_MODAL_SUCCESS_ORDER,
  OPEN_MODAL_SUCCESS_ORDER,
  CLOSE_MODAL_UNSUCCESS_ORDER,
  OPEN_MODAL_UNSUCCESS_ORDER,
  SET_INVALID_LOGIN,
  SUCCESSFULL_SEND_ORDER_BY_EMAIL,
  CLOSE_MODAL_FINISH_ORDER_AFTER_LOGIN,
  OPEN_MODAL_FINISH_ORDER_AFTER_LOGIN,
  SET_ORDER_NO
} from "../../actions/cart";

const initialState = {
  amountInBasket: 0,
  idUser: "",
  userMail: "",
  idCartInDB: "",
  orderNo: "",
  arrayProduct: [],
  arrayCheckout: [],
  windows: {
    successOrder: false,
    unsuccessOrder: false,
    invalidLogin: false,
    finishAfterLogin: false
  },
  checkedDelivery: "standart",
  deliveryMethods: [
    {
      name: "economical",
      duration: 14,
      price: 0
    },
    {
      name: "standart",
      duration: 7,
      price: 5
    },
    {
      name: "express",
      duration: 3,
      price: 10
    }
  ]
};

function setLocalStorage(arr) {
  localStorage.setItem("savedCart", JSON.stringify(arr));
}

function countAmount(array) {
  let count = 0;
  if (array) {
    array.forEach(elem => {
      count = count + elem.amount;
    });
  }

  return count;
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

function updateIsFinished(data) {
  updateCartIsFinished(data);
}

function cart(state = initialState, action) {
  switch (action.type) {
    case SET_ID_LOGGED_USER:
      return {
        ...state,
        userMail: action.payload.mail,
        idUser: action.payload.idUser
      };

    case SET_ID_CART_FROM_DB:
      return {
        ...state,

        idCartInDB: action.payload.idCartInDB
      };

    case SET_DATA_CART_FROM_DB:
      return {
        ...state,
        idCartInDB: action.payload.infoDB._id,
        idUser: action.payload.infoDB.idUser,
        arrayProduct: action.payload.infoDB.arrayProduct,
        amountInBasket: countAmount(action.payload.infoDB.arrayProduct)
      };

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
        amountInBasket: countAmount(action.payload.array)
      };

    case CART_FROM_LOCALSTORAGE_TO_DB:
      return {
        ...state,
        idCartInDB: action.payload.infoDB._id,
        idUser: action.payload.infoDB.idUser,
        arrayProduct: action.payload.infoDB.arrayProduct,
        amountInBasket: countAmount(action.payload.infoDB.arrayProduct)
      };

    case CLEAR_CART_ON_LOGOUT:
      return {
        ...state,
        amountInBasket: 0,
        idUser: "",
        idCartInDB: "",
        userMail: "",
        orderNo: "",
        windows: {
          successOrder: false,
          unsuccessOrder: false
        },
        arrayProduct: [],
        arrayCheckout: []
      };

    case ADD_ITEM_TO_CART:
      let arrProd = [];
      state.arrayProduct.forEach((elem, index) => {
        arrProd[index] = { ...elem };
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
        amountInBasket: countAmount(arrProd)
      };

    case CHANGE_CHECK_AMOUT_OF_ITEM:
      let changeCheckArrayAmountProd = action.payload.newArr.map(elem => {
        return elem;
      });

      if (state.idUser) {
        if (state.idCartInDB) {
          updateInDB(state.idCartInDB, changeCheckArrayAmountProd);
        } else {
          saveInDB(state.idUser, changeCheckArrayAmountProd);
        }
      } else {
        setLocalStorage(changeCheckArrayAmountProd);
      }
      return {
        ...state,
        arrayProduct: changeCheckArrayAmountProd,
        amountInBasket: countAmount(changeCheckArrayAmountProd)
      };

    case SET_CART_FROM_LOCALSTORAGE:
      return {
        ...state,
        arrayProduct: action.payload.arrLS,
        amountInBasket: countAmount(action.payload.arrLS)
      };

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
          priceFormDB: action.payload.newArr[index].priceFormDB
        };
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
        amountInBasket: countAmount(changeAfterCheck)
      };

    case CHANGE_DELIVERY_METHOD:
      return {
        ...state,
        checkedDelivery: action.payload.method
      };

    case SET_FINISHED_CART:
      // console.log('SET_FINISHED_CART');

      updateIsFinished(state);

      // updateIsFinished(state.idCartInDB);
      // sendOrder(state);

      // console.log('SET_FINISHED_CART 111');

      return {
        ...state
      };
    case SET_DEFAULT_FINISHED_CART:
      return {
        ...state,
        amountInBasket: 0,
        idCartInDB: "",
        arrayProduct: []
      };

    case OPEN_MODAL_SUCCESS_ORDER:
      return {
        ...state,
        windows: {
          successOrder: true,
          unsuccessOrder: false,
          invalidLogin: false,
          finishAfterLogin: false
        }
      };
    case CLOSE_MODAL_SUCCESS_ORDER:
      return {
        ...state,
        orderNo: "",
        arrayProduct: [],
        windows: {
          successOrder: false,
          unsuccessOrder: false,
          invalidLogin: false,
          finishAfterLogin: false
        }
      };

    case SET_ORDER_NO:
      return {
        ...state,
        orderNo: action.payload.orderNo
      };

    case OPEN_MODAL_UNSUCCESS_ORDER:
      return {
        ...state,
        windows: {
          successOrder: false,
          unsuccessOrder: true,
          invalidLogin: false,
          finishAfterLogin: false
        }
      };
    case CLOSE_MODAL_UNSUCCESS_ORDER:
      return {
        ...state,
        windows: {
          successOrder: false,
          unsuccessOrder: false,
          invalidLogin: false,
          finishAfterLogin: false
        }
      };
    case SET_INVALID_LOGIN:
      return {
        ...state,
        windows: {
          successOrder: false,
          unsuccessOrder: true,
          invalidLogin: true,
          finishAfterLogin: false
        }
      };

    case SUCCESSFULL_SEND_ORDER_BY_EMAIL:
      return {
        ...state,
        orderNo: action.payload.orderNo,
        windows: {
          successOrder: true,
          unsuccessOrder: false,
          invalidLogin: false,
          finishAfterLogin: false
        }
      };

    case OPEN_MODAL_FINISH_ORDER_AFTER_LOGIN:
      return {
        ...state,
        windows: {
          successOrder: false,
          unsuccessOrder: false,
          invalidLogin: false,
          finishAfterLogin: true
        }
      };

    case CLOSE_MODAL_FINISH_ORDER_AFTER_LOGIN:
      return {
        ...state,
        windows: {
          successOrder: false,
          unsuccessOrder: false,
          invalidLogin: false,
          finishAfterLogin: false
        }
      };

    default:
      return { ...state };
  }
}

export default cart;
