// @flow

import * as React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./static-pages.scss";

type Props = {};

type State = {
  pageTitle: string,
  content: Array<Object>
};
export default class AboutUs extends React.Component <Props, State> {
  state = {
    pageTitle: "",
    content: []
  };

  componentDidMount() {
    axios.get("/about-us").then(res => {
      this.setState({
        pageTitle: res.data.title,
        content: res.data.content
      });
    });
  }

  render() {
    const content = this.state.content;
    let pageContent = content.map(elem => {
      return (
        <div className="about-us-paragraph">
          <h4 className="about-us-title"> &bull; {elem.title} &bull;</h4>
          {elem.content}
        </div>
      );
    });

    return (
      <>
        <Helmet>
          <title>{this.state.pageTitle}</title>
        </Helmet>
        <div className="container">
          <h2 className="sub-page-title">{this.state.pageTitle}</h2>
          <h3 className="sub-page-sub-title">We have a lot to tell you</h3>
          <div className="about-us-wrapper">          
              {pageContent[0]}
              {pageContent[1]}
              {pageContent[2]}
              {pageContent[3]}
          </div>
        </div>
      </>
    );
  }
}
