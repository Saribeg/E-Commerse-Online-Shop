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

export default class OurPolicy extends React.Component<Props, State> {
  state = {
    pageTitle: "",
    content: []
  };

  componentDidMount() {
    axios.get("/our-policy").then(res => {
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
        <li className="list__item">
          <span class="list__item-bold">{elem.title}</span>
          {elem.content}
        </li>
      );
    });

    return (
      <>
        <Helmet>
          <title>{this.state.pageTitle}</title>
        </Helmet>
        <h2 className="sub-page__title">{this.state.pageTitle}</h2>
        <h3 className="sub-page__sub-title">We are at the top of the market</h3>
        <p className="our-policy__paragraph">
          When your business expands quickly, it can be hard to stay on top of
          policy creation and management. Sure, there may be quite a few
          unwritten rules that employees seem to be aware of and your
          organization just hasn’t gotten around to putting on paper yet, but
          those rules tend to cause more confusion than not. Just like the
          telephone game we played as kids, new rules heard “through the
          grapevine” are easily not shared correctly, misinterpreted and
          misunderstood.
        </p>
        <ol className="list" type="1">
          {pageContent}
        </ol>
      </>
    );
  }
}
