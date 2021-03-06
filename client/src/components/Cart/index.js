import React, { Component } from "react";
import { connect } from "react-redux";

import FinalOrder from "./FinalOrder";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  CHANGE_ARRAY_AMOUT_OF_ITEM,
  DELETE_ITEM_TO_CART,
  checkAvailableItem
} from "../../actions/cart";

import "./cart.scss";

class Cart extends Component {
  state = {
    isBlock: false,
    isRequest: false
  };

  handleChange = event => {
    let name = Number(event.target.name);
    let value = Number(event.target.value);

    if (!isNaN(value) && value > 0) {
      let arrayCheckProducts = [];

      if (this.props.dataBasket.arrayProduct.length > 0) {
        this.props.dataBasket.arrayProduct.forEach((elem, i) => {
          let checkItem = {};

          if (i === name) {
            checkItem = {
              ...elem,
              amount: value
            };
          } else {
            checkItem = {
              ...elem
            };
          }

          arrayCheckProducts.push(checkItem);
        });

        this.props.checkArrayAvailableItems(arrayCheckProducts);
      }

      this.setState({ [name]: value });
    } else {
      this.setState({ [name]: "" });
    }
  };

  falseBlock = () => {
    this.setState({
      isBlock: false
    });
  };

  falseRequest = () => {
    let arrayCheckProducts = [];

    if (this.props.dataBasket.arrayProduct.length > 0) {
      this.props.dataBasket.arrayProduct.forEach((elem, i) => {
        let checkItem = {};
        checkItem = {
          ...elem,
          amount: this.state[i]
        };
        arrayCheckProducts.push(checkItem);
      });
      this.props.checkArrayAvailableItems(arrayCheckProducts);
    }
    this.setState({
      isRequest: false
    });
  };

  addAmount = index => {
    let newAmount = this.state[index];
    newAmount++;

    if (!this.state.isBlock) {
      let arrayCheckProducts = [];

      if (this.props.dataBasket.arrayProduct.length > 0) {
        this.props.dataBasket.arrayProduct.forEach((elem, i) => {
          let checkItem = {};
          if (i === index) {
            checkItem = {
              ...elem,
              amount: newAmount
            };
          } else {
            checkItem = {
              ...elem
            };
          }

          arrayCheckProducts.push(checkItem);
        });
        this.props.checkArrayAvailableItems(arrayCheckProducts);
      }

      setTimeout(this.falseBlock, 1500);
      this.setState({
        isBlock: true,
        [index]: newAmount
      });
    } else {
      if (!this.state.isRequest) {
        setTimeout(this.falseRequest, 1500);
        this.setState({
          isRequest: true,
          [index]: newAmount
        });
      } else {
        this.setState({
          [index]: newAmount
        });
      }
    }
  };

  minusAmount = index => {
    let newAmount = this.state[index];

    if (newAmount - 1 > 0) {
      newAmount--;
      if (!this.state.isBlock) {
        let arrayCheckProducts = [];

        if (this.props.dataBasket.arrayProduct.length > 0) {
          this.props.dataBasket.arrayProduct.forEach((elem, i) => {
            let checkItem = {};
            if (i === index) {
              checkItem = {
                ...elem,
                amount: newAmount
              };
            } else {
              checkItem = {
                ...elem
              };
            }

            arrayCheckProducts.push(checkItem);
          });
          this.props.checkArrayAvailableItems(arrayCheckProducts);
        }

        setTimeout(this.falseBlock, 1500);
        this.setState({
          isBlock: true,
          [index]: newAmount
        });
      } else {
        if (!this.state.isRequest) {
          setTimeout(this.falseRequest, 1500);
          this.setState({
            isRequest: true,
            [index]: newAmount
          });
        } else {
          this.setState({
            [index]: newAmount
          });
        }
      }
    }
  };

  deleteItem = index => {
    let arr = this.props.dataBasket.arrayProduct;
    arr.splice(index, 1);

    this.props.deleteItem(arr);

    arr.forEach((elem, index) => {
      this.setState({ [index]: elem.amount });
    });
  };

  componentWillUpdate(nextProps, nextState) {
    let isUpdate = 0;
    let obj = {};
    nextProps.dataBasket.arrayProduct.forEach((elem, index) => {
      if (!this.state[index]) {
        if (this.state[index] !== "") {
          obj[index] = elem.amount;
          isUpdate = 1;
        }
      }
    });

    if (isUpdate) {
      let arrayCheckProducts = [];

      if (this.props.dataBasket.arrayProduct.length > 0) {
        this.props.dataBasket.arrayProduct.forEach((elem, index) => {
          let checkItem = {
            ...elem,
            amount: obj[index]
          };
          arrayCheckProducts.push(checkItem);
        });

        this.props.checkArrayAvailableItems(arrayCheckProducts);
      }
      this.setState({ ...obj });
    }
  }

  componentDidMount() {
    let obj = {};

    this.props.dataBasket.arrayProduct.forEach((elem, index) => {
      obj[index] = elem.amount;
    });
    this.setState({ ...obj });
  }

  render() {
    let productList = this.props.dataBasket.arrayProduct.map((elem, index) => {
      let keyItem = index;
      let amount = this.state[keyItem];

      let classIsAvailable = elem.isAvailable
        ? "basket-item-available"
        : "d-none";
      let classIsNotAvailable = !elem.isAvailable
        ? "basket-item-notavailable"
        : "d-none";

      let classWasChangedPrice =
        Number(elem.price) !== Number(elem.priceFormDB) ? null : "d-none";
      let classWasntChangedPrice =
        Number(elem.price) === Number(elem.priceFormDB) ? null : "d-none";

      return (
        <li key={keyItem + "indexCart"} className="basket-item">
          <span
            className="basket-item-delete"
            onClick={() => this.deleteItem(keyItem)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <div className="basket-item-img">
            <img src={elem.urlPhoto} alt={elem.model} />
          </div>
          <div className="basket-item-info">
            <p className="basket-item-title">{elem.model}</p>
            <p>
              <span className="fw-bold">Color:</span> {elem.colorName}
            </p>
            <p>
              <span className="fw-bold">Size:</span> {elem.size}
            </p>
            <p className={classIsAvailable}>In Stock</p>
          </div>
          <div className="product-counter">
            <button
              className="product-counter-btn"
              onClick={() => this.minusAmount(keyItem)}
            >
              -
            </button>
            <input
              name={keyItem}
              type="text"
              className="product-counter-input-value"
              value={amount}
              onChange={this.handleChange}
            />
            <button
              className="product-counter-btn"
              onClick={() => this.addAmount(keyItem)}
            >
              +
            </button>
          </div>
          <div className="basket-item-title price">
            <div className={classWasChangedPrice}>
              <div className="basket-item-old-price">${elem.price}</div>

              <div className="basket-item-new-price">${elem.priceFormDB}</div>
            </div>

            <div className={classWasntChangedPrice}>${elem.price}</div>
          </div>
          <div className={classIsNotAvailable}>
            Out of Stock! {elem.reasonNotAvailable}
            <input
              type="button"
              value={`Accept ${elem.availableAmount} items`}
              onClick={() =>
                this.handleChange({
                  target: {
                    name: keyItem,
                    value: elem.availableAmount
                  }
                })
              }
            />
          </div>
        </li>
      );
    });

    return (
      <section className="basket-page container">
        <ul className="basket-items-list">
          {productList.length > 0 ? (
            productList
          ) : (
            <div className="basket-empty-state">No goods :(</div>
          )}
        </ul>

        <FinalOrder />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataBasket: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeArrayAmount: obj => {
      dispatch({ type: CHANGE_ARRAY_AMOUT_OF_ITEM, payload: { obj: obj } });
    },

    deleteItem: array => {
      dispatch({ type: DELETE_ITEM_TO_CART, payload: { array: array } });
    },

    checkArrayAvailableItems: arrData => dispatch(checkAvailableItem(arrData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
