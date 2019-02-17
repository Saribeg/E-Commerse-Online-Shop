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
        console.log(subMail.mail)
    };

    render() {

        return (
            <>
                <div className="subscribe-section">
                    <h4 className="subscribe-text">Subscribe</h4>
                    <p className="subscribe-info">Get the day’s top news stories<br/>delivered to your inbox</p>
                    <form onSubmit={this.sendMail} className="input-form">
                        <input onChange={this.handleChange} id='subscribe-mail' className="input-email__text" type="email"
                               placeholder="Enter your email here..." value={this.state.mail}/>
                        <input id='subscribe-btn' type="submit" className="subscribe-button" value='SUBSCRIBE'/>
                    </form>
                </div>
            </>
        )
    }
}

export default Subscribe;