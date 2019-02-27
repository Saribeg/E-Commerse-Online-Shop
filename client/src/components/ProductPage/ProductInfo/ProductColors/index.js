import React, { Component } from 'react'

export default class ProductColors extends Component {

	render() {
		const colorArray = this.props.colors;
	
 		const colors = colorArray.map((elem) => {
			 let activeElement = elem.colorName === this.props.activeColor ? 'active' : null; 

				return (
					<li className={`${activeElement} color-item`} style={{backgroundColor: elem.color}} onClick={() => this.props.changeColor(elem.colorName)}></li>
		)		
	}) 
		return (								
			 <ul className="product-colors">{colors}</ul>	
		)
	}
}
