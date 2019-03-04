import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      let itemLinks = item.links.map(item => {
        // Тут надо заменить Math.random() на реальный ключ из БД, для этого в БД нужно хранить не просто массив стрингов links, а массив объектов и там будет свойство объекта в виде стринга, у каждого объекта будет генерироваться свой уникальный ключ (монго дб так устроен, что если внури объекта/массива есть другие вложенные объекты, то у каждого вложенного объекта генерится свой айди)
        return (
          <li
            key={Math.random() * (100000 - 1) + 1}
            className="footer-column-item"
          >
            <a href="/" className="footer-column-link">
              {item}
            </a>
          </li>
        );
      });

      return (
        <div key={item._id} className="footer-menu-column">
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
              <Link to="/" className="footer-logo">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="footer-menu">{columns}</div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
