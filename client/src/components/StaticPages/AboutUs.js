import React, { Component } from 'react';
import axios from 'axios';
import './static-pages.scss'

export default class AboutUs extends Component {

 state = {
	 pageTitle: '',
   content: []
  }

	componentDidMount() {
    axios.get('/about-us').then(res => {
		 const pageTitle = res.data[0].title;
		 const content = res.data[0].content;
		 this.setState({ 
			 pageTitle: pageTitle,
			 content: content })
    });
  }

	render() {
		const content = this.state.content;
		let pageContent = content.map((elem) => {
			 return (
				<div className="about-us__paragraph">
				<h4 className="about-us__title"> &bull; {elem.title} &bull;</h4>
				{elem.content}
		</div>
			 )
		})

		return (
			<div className="container">
				<h2 className="sub-page__title">{this.state.pageTitle}</h2>
				<h3 className="sub-page__sub-title">
            We have a lot to tell you
        </h3>
				<div className="about-us__wrapper">
				<div className="about-us__content">
				{pageContent[0]}
				{pageContent[1]}
				</div>
				<div className="about-us__content">
				{pageContent[2]}
				{pageContent[3]}
				</div>
				</div>
			</div>
		)
	}
}
