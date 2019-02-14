import React, { Component } from "react";
import "./footer.scss";
import logo from "../../img/matter-white.svg";
import axios from "axios";

class Footer extends Component {
  state = {
    links: []
  };

  componentDidMount() {
    axios.get(`/get-footer`).then(res => {
      this.setState({ links: res.data });
    });
  }

  render() {
    let columns = this.state.links.map(item => {
      console.log(item.title);
      let itemLinks = item.links.map(item => {
        return (
          <li className="footer-column-item">
            <a href="/" className="footer-column-link">
              {item}
            </a>
          </li>
        );
      });

      return (
        <div className="footer-menu-column">
          <h3 className="footer-menu-column-title">
            {item.title}
            <i className="fas fa-plus block-hidden" />
          </h3>
          <ul className="footer-column-list">{itemLinks}</ul>
        </div>
      );
    });

    return (
      <footer className="main-footer">
        <div className="container">
          <div className="footer-list">
            <div className="footer-column">
              <a href="#" className="footer-logo">
                <img src={logo} alt="logo" />
              </a>
            </div>
            <div className="footer-menu">{columns}</div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
