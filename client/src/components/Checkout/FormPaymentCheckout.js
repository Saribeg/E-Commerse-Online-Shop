import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {requiredInput, correctEmail} from '../../validation'
import customRequiredInput from '../atomic/customRequiredInput';
import customCorrectEmail from '../atomic/customCorrectEmail';

class FormPaymentCheckout extends Component {
    render(){
        const {handleSubmit, pristine, submitting, invalid} = this.props;
        return (
            <form onSubmit={handleSubmit}>

                <div className='checkout-payment-content-label'>
                    Card number
                </div>
                <Field name="cardNumber" component={customRequiredInput}
                       type="text" placeholder="Full name on card..."
                       className='checkout-delivery-content-input'
                       classError='input-error-message'
                       validate={[requiredInput]}
                />
                <div className='checkout-payment-content-label'>
                    Name on card
                </div>
                <Field name="nameOnCard" component={customRequiredInput}
                       type="text" placeholder="Card number..."
                       className='checkout-delivery-content-input'
                       classError='input-error-message'
                       validate={[requiredInput]}
                />
                <div className='checkout-payment-content-label'>
                    Expiry date MM/YYYY
                </div>
                <Field name="expiryMonth" component={customRequiredInput}
                       type="text"
                       className='checkout-delivery-content-input'
                       classError='input-error-message'
                       validate={[requiredInput]}
                />
                <Field name="expiryYear" component={customRequiredInput}
                       type="text"
                       className='checkout-delivery-content-input'
                       classError='input-error-message'
                       validate={[requiredInput]}
                />
                <div className='checkout-payment-content-label'>
                    CVC
                </div>
                <Field name="cvcCode" component={customRequiredInput}
                       type="text" placeholder="CVC"
                       className='checkout-delivery-content-input'
                       classError='input-error-message'
                       validate={[requiredInput]}
                />


                <button name='checkoutPaymentSbm' disabled={invalid || pristine || submitting} type="submit" className='checkout-next-btn' label="submit">Finish checkout</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // initialValues: {
        //     firstName: state.login.loggedData.firstName,
        //     secondName: state.login.loggedData.secondName,
        //     email: state.login.loggedData.email,
        // }
    }
}

FormPaymentCheckout = reduxForm({
    form: 'formPaymentCheckout'
})(FormPaymentCheckout);


export default connect(mapStateToProps)(FormPaymentCheckout);