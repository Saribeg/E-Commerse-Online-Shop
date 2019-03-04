import React, { Component } from 'react';
import axios from 'axios';

export default class OurPolicy extends Component {

 state = {
   content: ''
  }

	componentDidMount() {
    axios.get('/our-policy').then(res => {
		/* 	this.setState({ content: res.data }); */
			console.log(res);
			console.log(res.status);
    });
  }

	render() {
		return (
			<div>
				111
			</div>
		)
	}
}
