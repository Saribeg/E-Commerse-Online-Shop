import React, { Component } from "react";
import { connect } from "react-redux";
import PlaceOrder from "./PlaceOrder";
import FormDeliveryCheckout from "./FormDeliveryCheckout";
import FormPaymentCheckout from "./FormPaymentCheckout";

import SuccessOrder from "./Modals/SuccessOrder";
import UnsuccessOrder from "./Modals/UnsuccessOrder";
import FinishAfterLogin from "./Modals/FinishAfterLogin";

import { CHANGE_DELIVERY_METHOD } from "../../actions/cart";

import "./Checkout.scss";

class Checkout extends Component {
  state = {
    showDelivery: false,
    showPayment: false,
    finishOrder: false
  };

  clickShowDelivery = () => {
    this.setState({
      showDelivery: true
    });
  };

  handleDeliverySubmit = values => {
    this.setState({
      showPayment: true
    });
  };

  handlePaymentSubmit = values => {
    this.setState({
      finishOrder: true
    });
  };

  checkCorrectPayment = value => {
    this.setState({
      finishOrder: !value
    });
  };

  handleLoginUnsuccessForm = e => {
    if (e.target.dataset.btn !== "btn-login-checkout-up-close") {
      e.stopPropagation();
    }
  };

  render() {
    let arrayProducts = [];

    arrayProducts = this.props.dataBasket.arrayProduct.map(elem => {
      if (elem.isAvailable) {
        return (
          <li className="checkout-product-item">
            <img
              src={elem.urlPhoto}
              alt=""
              className="checkout-product-item-img"
            />
            <div className="checkout-product-item-block">
              <div className="checkout-product-item-details">
                <div className="checkout-product-item-description">
                  <p className="checkout-product-item-model">{elem.model}</p>
                  <p className="checkout-product-item-color">
                    {`Color - ${elem.colorName}`}
                  </p>
                  <p className="checkout-product-item-size">
                    {`Size - ${elem.size}`}
                  </p>
                </div>
              </div>
              <div className="checkout-product-item-price">
                <p>{`$${elem.priceFormDB} x ${elem.amount}`}</p>
                <p className="checkout-product-item-price-bold">
                  {`$${(elem.amount * elem.priceFormDB).toFixed(2)}`}
                </p>
              </div>
            </div>
          </li>
        );
      }
      return null;
    });

    let arrayDelivery = [];
    if (this.props.dataBasket.deliveryMethods) {
      arrayDelivery = this.props.dataBasket.deliveryMethods.map(elem => {
        return (
          <li key={elem.name}>
            <input
              className="delivery-input"
              type="radio"
              name="deliveryFilter"
              value={elem.name}
              checked={elem.name === this.props.dataBasket.checkedDelivery}
              id={elem.name}
              onChange={() => this.props.handleDeliveryRadio(elem.name)}
            />
            <label
              className="delivery-link"
              title={elem.name}
              htmlFor={elem.name}
            >
              <div className="delivery-link-block">
                <p>Delivery - {elem.name}</p>
                <p>Estimated delivery - {elem.duration} days</p>
                <p>Price -  ${elem.price}</p>
              </div>
            </label>
          </li>
        );
      });
    }

    let showDeliveryClass = this.state.showDelivery
      ? "checkout-delivery-details"
      : "d-none";
    let showPaymentClass = this.state.showPayment
      ? "checkout-payment"
      : "d-none";

    return (
      <section className="checkout-page container">
        <div className="checkout">
          <ul className="checkout-product-list">{arrayProducts}</ul>

          <div className="checkout-delivery-method">
            <p className="checkout-delivery-details-title">
              Choose one of delivery method
            </p>

            <ul className="checkout-delivery-list">{arrayDelivery}</ul>

            <input
              type="button"
              value="Next step"
              onClick={this.clickShowDelivery}
              className="checkout-next-btn"
            />
          </div>

          <div className={showDeliveryClass}>
            <p className="checkout-delivery-details-title">
              Please enter your address
            </p>

            <FormDeliveryCheckout onSubmit={this.handleDeliverySubmit} />
          </div>

          <div className={showPaymentClass}>
            <p className="checkout-delivery-details-title">
              Please enter your payment information
            </p>

            <FormPaymentCheckout
              checkCorrectPayment={this.checkCorrectPayment}
              onSubmit={this.handlePaymentSubmit}
            />
          </div>
        </div>

        <PlaceOrder enableBtn={this.state.finishOrder} />

        <SuccessOrder />

        <div onClick={this.handleLoginUnsuccessForm}>
          {this.props.dataBasket.windows.unsuccessOrder && <UnsuccessOrder />}
        </div>

        <FinishAfterLogin />
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
    handleDeliveryRadio: radio => {
      dispatch({ type: CHANGE_DELIVERY_METHOD, payload: { method: radio } });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
