import React, { Component } from 'react'

export default class ProductColors extends Component {

/*   getColors = (colorArray=[0: {color: 'black'}]) => {
 		 	colorArray = this.props.colors;		
			const colors = colorArray.map((elem) => {
				return (
						<li className="color-item" style={{backgroundColor: elem.color}}></li>
			)		
		})
			return colors; 
	}  */
 
	render() {
		const colorArray = this.props.colors;		
		const colors = colorArray.map((elem) => {
			return (
					<li className="color-item" style={{backgroundColor: elem.color}}></li>
		)		
	})
		return (
								
			 <ul className="product-colors">{colors}</ul>	
		)
	}
}
