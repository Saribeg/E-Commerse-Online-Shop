import React, { Component } from 'react';
import axios from 'axios';

export default class Careers extends Component {
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
    console.log(this.state);
  }

  render() {
    const content = this.state.content;
    let pageContent = content.map(elem => {
      return (
        <div className="job-description">
				<h3 className="job-description__position">{elem.title}</h3>
         <p className="job-description__text">{elem.content}</p>
        </div>
      );
    });

	
		return (
			<>
			<h2 className="sub-page__title">{this.state.pageTitle}</h2>
			<h3 className="sub-page__sub-title">There are several options to suggest</h3>
			{pageContent}
			<p className="job-offer__feedback">If you are interested, please send your resume: matter-style@mail.com</p>
			</>
		)

}

}
