import React, {Component} from 'react';
import './Subscribe.scss'
import axios from 'axios';

class Subscribe extends Component {

    state = {
        mail: ''
    };

    handleChange = (e) => {
        this.setState({mail: e.target.value})
    };

    sendMail = (e) => {
        e.preventDefault();
        const subMail = {
            mail: this.state.mail
        };
        axios.post('/subscribe', {subMail});
        this.setState({mail: ''})
    };

    render() {

        return (
            <>
                <section className="section-subscribe">
                    <div className="container">
                        <div className="subscribe">
                            <h2 className="subscribe-title">Subscribe</h2>
                            <div className="subscribe-description">Get the day’s top news stories delivered to your
                                inbox
                            </div>
                            <form onSubmit={this.sendMail} className="subscribe-form">
                                <input onChange={this.handleChange} id='subscribe-mail' type="text"
                                       className="subscribe-email" placeholder="Enter your email here..."
                                       value={this.state.mail}/>
                                <input id='subscribe-btn' type="submit" className="subscribe-btn" value='SUBSCRIBE'/>
                            </form>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Subscribe;