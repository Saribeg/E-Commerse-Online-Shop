// @flow

import * as React from "react";
import "./subscribe.scss";
import axios from "axios";
import {requiredInput, correctEmail} from '../../validation'

type Props = {};

type State = {
    mail: string,
    hintMessage: string
};

class Subscribe extends React.Component<Props, State> {
    state = {
        mail: "",
        hintMessage: ""
    };

    handleChange = (e: Object) => {
        this.setState({mail: e.target.value});
    };

    sendMail = (e: Object) => {
        e.preventDefault();
        const subMail = {
            mail: this.state.mail,
        };
        axios.post("/subscribe", {subMail})
            .then(res => res.data)
            .then(data => {
                if (data.result === false) {
                    this.setState({hintMessage: 'alreadyUsed'});
                    setTimeout(() => {
                        this.setState({hintMessage: 'clear'})
                    }, 2000)
                } else {
                    this.setState({mail: "", hintMessage: 'sendMail'});
                    setTimeout(() => {
                        this.setState({hintMessage: 'clear'})
                    }, 2000)
                }
            });

        if (this.state.mail === '') {
            this.setState({hintMessage: 'emptyMail'});
            setTimeout(() => {
                this.setState({hintMessage: 'clear'})
            }, 2000)
        }
    };

    render() {
        let hintMessage;

        if (this.state.hintMessage === 'clear') {
            hintMessage = '';
        } else if (this.state.hintMessage === 'emptyMail') {
            hintMessage = 'Fill in the input field please!';
        } else if (this.state.hintMessage === 'alreadyUsed') {
            hintMessage = 'You are already subscribed.';
        } else if (this.state.hintMessage === 'sendMail') {
            hintMessage = 'Email has been sent!';
        }

        return (
            <>
                <section className="section-subscribe">
                    <div className="container">
                        <div className="subscribe">
                            <h2 className="subscribe-title">Subscribe</h2>
                            <div className="subscribe-description">
                                Get the day’s top news stories delivered to your inbox
                            </div>
                            <form onSubmit={this.sendMail} className="subscribe-form">
                                <input
                                    onChange={this.handleChange}
                                    id="subscribe-mail"
                                    type="text"
                                    className="subscribe-email"
                                    placeholder="Enter your email here..."
                                    value={this.state.mail}
                                />
                                <input
                                    id="subscribe-btn"
                                    type="submit"
                                    className="subscribe-btn"
                                    value="SUBSCRIBE"
                                />
                            </form>
                        </div>
                        <p className={this.state.hintMessage === 'sendMail' ? 'sendMail' : 'hintMessage'}>{hintMessage}</p>
                    </div>
                </section>
            </>
        );
    }
}

export default Subscribe;
