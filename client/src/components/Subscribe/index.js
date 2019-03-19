// @flow

import * as React from "react";
import "./subscribe.scss";
import axios from "axios";

type Props = {};

type State = {
  mail: string
};
class Subscribe extends React.Component<Props, State> {
  state = {
    mail: ""
  };

  handleChange = (e: Object) => {
    this.setState({ mail: e.target.value });
  };

  sendMail = (e: Object) => {
    e.preventDefault();
    const subMail = {
      mail: this.state.mail
    };
    axios.post("/subscribe", { subMail });
    this.setState({ mail: "" });
  };

  render() {
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
          </div>
        </section>
      </>
    );
  }
}

export default Subscribe;
