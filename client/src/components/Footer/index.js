import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../img/matter-white.svg";
import axios from "axios";
import "./footer.scss";

class Footer extends Component {
  state = {
    content: []
  };

  componentDidMount() {
    axios.get(`/get-footer`).then(res => {
      this.setState({ content: res.data });
    });
  }

  render() {
    const footerContent = this.state.content.map(elem => {
      const linksList = elem.links.map(link => {
        return (
          <ul className="footer-column-list" key={link.title}>
            <li key={elem._id} className="footer-column-item">
              <NavLink
                to={link.path}
                className="footer-column-link"
                activeClassName="footer-column-link"
              >
                {link.title}
              </NavLink>
            </li>
          </ul>
        );
      });

      return (
        <div className="footer-menu-column" key={elem._id}>
          <h3 className="footer-menu-column-title">{elem.title}</h3>
          {linksList}
        </div>
      );
    });

    return (
      <footer className="main-footer">
        <div className="container">
          <div className="footer-list">
            <div className="footer-column">
              <Link to="/" className="footer-logo">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="footer-menu">{footerContent}</div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
