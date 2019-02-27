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

        return (
            <>
                <section className="section-unsubscribe">
                    <div className="container">
                        <div className="unsubscribe">
                            <form onSubmit={this.unsubscribeMail} className="unsubscribe-form">
                                <input id='unsubscribe-btn' type="submit" className="unsubscribe-btn"
                                       value='UNSUBSCRIBE'/>
                            </form>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Unsubscribe;
