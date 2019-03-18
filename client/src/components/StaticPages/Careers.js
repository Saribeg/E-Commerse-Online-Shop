// @flow
import * as React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

type Props = {};

type State = {
  pageTitle: string,
  content:  Array<Object>
};
export default class Careers extends React.Component<Props, State> {
  state = {
    pageTitle: "",
    content: []
  };

  componentDidMount() {
    axios.get("/careers").then(res => {
      console.log(res);
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
        <div className="job-description">
          <h3 className="job-description-position">{elem.title}</h3>
          <p className="job-description-text">{elem.content}</p>
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
        <h3 className="sub-page-sub-title">
          There are several options to suggest
        </h3>
        {pageContent}
        <p className="job-offer-feedback">
          If you are interested, please send your resume: matter-style@mail.com
        </p>
        </div>
      </>
    );
  }
}
