import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

// import {CLOSE_LOGIN_DETAILS} from "../../../actions/login";


class PaymentDetails extends Component {

    state = {
        cardNumber: '',
        nameOnCard: '',
        expiryMonth: '',
        expiryYear: ''
    }

    onStateChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    componentWillMount () {
        if (this.props.personalInfo.isLogged) {
            this.setState({

                cardNumber: this.props.personalInfo.loggedData.paymentInfo.cardNumber,
                nameOnCard: this.props.personalInfo.loggedData.paymentInfo.nameOnCard,
                expiryMonth: this.props.personalInfo.loggedData.paymentInfo.expiryMonth,
                expiryYear: this.props.personalInfo.loggedData.paymentInfo.expiryYear

            })
        }
    }

    render() {
        let classIsLogged = (this.props.personalInfo.isLogged) ? null : 'd-none';
        let classNotLogged = (this.props.personalInfo.isLogged) ? 'd-none' : null;

        return (
            <Fragment>
                <div className={classNotLogged}>
                    Please log in to system
                </div>

                <div className={classIsLogged}>
                    <div>
                        <div className='section-profile-content-label'>
                            Card number
                        </div>
                        <input name='cardNumber' type="text" className='section-profile-content-input'
                               value={this.state.cardNumber} onChange={this.onStateChange}/>
                        <div className='section-profile-content-label'>
                            Name on card
                        </div>
                        <input name='nameOnCard' type="text" className='section-profile-content-input'
                               value={this.state.nameOnCard} onChange={this.onStateChange}/>

                        <div className='section-profile-content-label'>
                            Expiry date MM/YYYY
                        </div>
                        <div>
                            <input name='expiryMonth' type="text" className='section-profile-content-input-date-mm'
                                   value={this.state.expiryMonth} onChange={this.onStateChange}/>
                            <span>&nbsp;&#47;&nbsp;</span>
                            <input name='expiryYear' type="text" className='section-profile-content-input-date-yyyy'
                                   value={this.state.expiryYear} onChange={this.onStateChange}/>
                        </div>
                        <input type="button" className='section-profile-content-btn' value='Save changes'/>

                    </div>
                </div>



            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        personalInfo: state.login,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails)