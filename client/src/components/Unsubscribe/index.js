import React, {Component} from "react";
import './Unsubscribe.scss';
import axios from "axios";

class Unsubscribe extends Component {
    state = {
        submitted: false
    };

    unsubscribeMail = (e) => {
        e.preventDefault();
        axios.post(window.location.href);
        this.setState({submitted: true});
    };

    render() {

        if (this.state.submitted === true) {
            return (
                <>
                    <div className="container">
                        <p className="unsubscribe-text">You have been unsubscribed from our mailing!</p>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <section className="section-unsubscribe">
                        <div className="container">
                            <div className="unsubscribe">
                                <form onSubmit={this.unsubscribeMail} className="unsubscribe-form">
                                    <input id='unsubscribe-btn' type="submit" className="unsubscribe-form-btn"
                                           value='UNSUBSCRIBE'/>
                                </form>
                            </div>
                        </div>
                    </section>
                </>
            );
        }
    }
}

export default Unsubscribe;
