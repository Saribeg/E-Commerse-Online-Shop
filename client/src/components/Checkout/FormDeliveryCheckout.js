import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {requiredInput, correctEmail} from '../../validation'
import customRequiredInput from '../atomic/customRequiredInput';
import customCorrectEmail from '../atomic/customCorrectEmail';

class FormDeliveryCheckout extends Component {
    render(){
        const {handleSubmit, pristine, submitting, invalid} = this.props;
        return (
            <form onSubmit={handleSubmit}>

                <div className='checkout-delivery-content-label'>
                    Country
                </div>
                <Field name="country" component={customRequiredInput}
                       type="text" placeholder="Your country..."
                       className='checkout-delivery-content-input'
                       classError='input-error-message'
                       validate={[requiredInput]}
                />
                <div className='checkout-delivery-content-label'>
                    Zipcode
                </div>
                <Field name="zipcode" component={customRequiredInput}
                       type="text" placeholder="Your zipcode..."
                       className='checkout-delivery-content-input'
                       classError='input-error-message'
                       validate={[requiredInput]}
                />
                <div className='checkout-delivery-content-label'>
                    City
                </div>
                <Field name="city" component={customRequiredInput}
                       type="text" placeholder="Your city..."
                       className='checkout-delivery-content-input'
                       classError='input-error-message'
                       validate={[requiredInput]}
                />
                <div className='checkout-delivery-content-label'>
                    Street
                </div>
                <Field name="street" component={customRequiredInput}
                       type="text" placeholder="Your street..."
                       className='checkout-delivery-content-input'
                       classError='input-error-message'
                       validate={[requiredInput]}
                />
                <div className='checkout-delivery-content-label'>
                    Phone
                </div>
                <Field name="phone" component={customRequiredInput}
                       type="text" placeholder="Your phone number..."
                       className='checkout-delivery-content-input'
                       classError='input-error-message'
                       validate={[requiredInput]}
                />


                <button name='checkoutDeliverySbm' disabled={invalid || pristine || submitting} type="submit" className='checkout-next-btn' label="submit">Next step</button>
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

FormDeliveryCheckout = reduxForm({
    form: 'formDeliveryCheckout'
})(FormDeliveryCheckout);


export default connect(mapStateToProps)(FormDeliveryCheckout);