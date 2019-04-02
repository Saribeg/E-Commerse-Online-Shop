import React, {Component} from 'react'


class RegistrationOk extends Component {

    render() {

        return (

                <div className="login-menu login-menu-block">
                    <h2 className="login-menu_header">Successfull registration</h2>
                    <p className="login-menu_par">
                        You were successfully registered on our site. We sent you e-mail with link to verify your account.
                        Please read email and click to link for finish registration.
                    </p>
                    <p className="login-menu_par">
                        Thank you!
                    </p>

                    <div data-btn="btn-reg-ok-down-close" onClick={()=> document.body.style.overflow="auto"} className='login-form_btn register_btn'>Ok
                    </div>
                </div>

        )
    }
}

export default RegistrationOk