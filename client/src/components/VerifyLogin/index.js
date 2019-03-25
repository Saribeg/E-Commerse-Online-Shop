import React, {Component} from 'react';
import axios from 'axios';

import {NavLink} from "react-router-dom";

import "./VerifyLogin.scss"

class VerifyLogin extends Component {

    state = {
        success: false,
    }

    componentDidMount() {

        axios.post("/users/verify", {id: this.props.match.params.id})
            .then(res => res.data)
            .then(data => {
                if (data.success) {
                    this.setState({
                        success: true
                    })
                }
            })
            .catch()

    }

    render() {

        return (
            <>
                {
                    (!this.state.success) ?
                        (<div className="verify-block">

                            <p className="verify-title">
                                Unsuccessfull verifying of email
                            </p>

                            <p className="verify-text">
                                You try to verify incorrect email
                            </p>
                            <p className="verify-text">
                                Please open our mail and click on link
                            </p>

                            <NavLink className="verify-link" to="/">
                                Go to main page
                            </NavLink>
                        </div>) :
                        (<div className="verify-block">

                            <p className="verify-title">
                                Successfull verifying of email
                            </p>

                            <p className="verify-text">
                                You account was successfully verified.
                            </p>
                            <p className="verify-text">
                                You can go to main page and log in
                            </p>

                            <NavLink className="verify-link" to="/">
                                Go to main page
                            </NavLink>
                        </div>)
                }
            </>
        )
    }

}

export default VerifyLogin