import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { requiredInput, cardNumber, cvc, dateExp } from "../../validation";
import customRequiredInput from "../atomic/customRequiredInput";

class FormPaymentCheckout extends Component {
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    return (
      <form
        onChange={this.props.checkCorrectPayment(
          invalid || pristine || submitting
        )}
        onSubmit={handleSubmit}
      >
        <div className="checkout-payment-content-label">Card number</div>
        <Field
          name="cardNumber"
          component={customRequiredInput}
          type="text"
          placeholder="Card number..."
          className="checkout-delivery-content-input"
          classError="input-error-message"
          validate={[cardNumber]}
        />
        <div className="checkout-payment-content-label">Name on card</div>
        <Field
          name="nameOnCard"
          component={customRequiredInput}
          type="text"
          placeholder="Full name on card..."
          className="checkout-delivery-content-input"
          classError="input-error-message"
          validate={[requiredInput]}
        />
        <div className="checkout-payment-below-block">
          <div className="checkout-payment-expdate-block">
            <div className="checkout-payment-content-label">
              Expiry date MM/YYYY
            </div>
            <div className="checkout-payment-exp">
              <Field
                name="expiryMonth"
                component={customRequiredInput}
                type="text"
                placeholder="MM"
                className="checkout-payment-exp-input"
                // classError='input-error-message'
                // validate={[dateExp]}
              />
              <span>&nbsp;/&nbsp;</span>
              <Field
                name="expiryYear"
                component={customRequiredInput}
                type="text"
                placeholder="YYYY"
                className="checkout-payment-exp-input"
                classError="input-error-message-exp"
                validate={[dateExp]}
              />
            </div>
          </div>
          <div className="checkout-payment-expdate-block">
            <div className="checkout-payment-content-label">CVC</div>
            <Field
              name="cvcCode"
              component={customRequiredInput}
              type="text"
              placeholder="CVC"
              className="checkout-payment-exp-input"
              classError="input-error-message"
              validate={[cvc]}
            />
          </div>
        </div>

        {/*<button name='checkoutPaymentSbm' disabled={invalid || pristine || submitting} type="submit" className='checkout-next-btn' label="submit">Finish checkout</button>*/}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    // initialValues: {
    //     firstName: state.login.loggedData.firstName,
    //     secondName: state.login.loggedData.secondName,
    //     email: state.login.loggedData.email,
    // }
  };
};

FormPaymentCheckout = reduxForm({
  form: "formPaymentCheckout"
})(FormPaymentCheckout);

export default connect(mapStateToProps)(FormPaymentCheckout);
