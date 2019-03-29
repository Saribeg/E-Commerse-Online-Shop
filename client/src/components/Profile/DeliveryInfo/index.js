import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

// import {CLOSE_LOGIN_DETAILS} from "../../../actions/login";


class DeliveryInfo extends Component {

    state = {
        country: '',
        zipcode: '',
        city: '',
        street: '',
        phone: ''
    }

    onStateChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    componentWillMount () {
        if (this.props.personalInfo.isLogged) {
            this.setState({
                country: this.props.personalInfo.loggedData.deliveryData.country,
                zipcode: this.props.personalInfo.loggedData.deliveryData.zipcode,
                city: this.props.personalInfo.loggedData.deliveryData.city,
                street: this.props.personalInfo.loggedData.deliveryData.street,
                phone: this.props.personalInfo.loggedData.deliveryData.phone
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
                            Country
                        </div>
                        <input name='country' type="text" className='section-profile-content-input'
                               value={this.state.country} onChange={this.onStateChange} />
                        <div className='section-profile-content-label'>
                            Zipcode
                        </div>
                        <input name='zipcode' type="text" className='section-profile-content-input'
                               value={this.state.zipcode} onChange={this.onStateChange} />
                        <div className='section-profile-content-label'>
                            City
                        </div>
                        <input name='city' type="text" className='section-profile-content-input'
                               value={this.state.city} onChange={this.onStateChange} />
                        <div className='section-profile-content-label'>
                            Street
                        </div>
                        <input name='street' type="text" className='section-profile-content-input'
                               value={this.state.street} onChange={this.onStateChange} />
                        <div className='section-profile-content-label'>
                            Phone
                        </div>
                        <input name='phone' type="text" className='section-profile-content-input'
                               value={this.state.phone} onChange={this.onStateChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryInfo)