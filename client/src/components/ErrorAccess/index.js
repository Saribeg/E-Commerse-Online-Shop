import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

import "./ErrorAccess.scss"


class ErrorAccess extends Component {

    render() {

        return (
            <div className="section-error-success">
                <p className="section-error-success-title">
                    Oooops. Something went wrong
                </p>
                <NavLink to="/" className="section-error-success-link">
                    Back to Main Page
                </NavLink>
            </div>
        )
    }

}


export default ErrorAccess