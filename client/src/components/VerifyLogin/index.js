import React, {Component} from 'react';
import axios from 'axios';

import {NavLink} from "react-router-dom";

class VerifyLogin extends Component {

    state = {
        success: false,
    }

    componentDidMount() {

        console.log('this.props.match.params.id', this.props.match.params.id)

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
                        (<div>
                            You try to verify incorrect email
                            <NavLink to="/">
                                Go to main page
                            </NavLink>
                        </div>) :
                        (<div>
                            You account was successfully verified.
                            You can go to main page and log in
                            <NavLink to="/">
                                Go to main page
                            </NavLink>
                        </div>)
                }
                Lalala
            </>
        )
    }

}

export default VerifyLogin