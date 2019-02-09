import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import './empty-state.scss';

export default class EmptyState extends Component {
	render() {
		return (
			<div className="empty-state">
				<FontAwesomeIcon icon="question" className="empty-state-icon"/>
				<p className="empty-state-title">{this.props.title}</p>
				<NavLink to="/">Return to main page </NavLink>
			</div>
		)
	}
}

