import React, { Component } from "react";

export default class ProductColors extends Component {

  render() {
    const colorArray = this.props.colors;

    const colors = colorArray.map(elem => {
			let quantityAll = [];
			elem.sizes.map((elem)=>{
				quantityAll.push(Number(elem.quantity))
				 });
				quantityAll.reduce(function(a,b){return(a+b)})

		 	if(quantityAll === 0){
				 return;
			 }
			let activeElement =
        elem.colorName === this.props.activeColor ? "active" : null;
			
      return (
        <li key={elem._id}
          className={`${activeElement} color-item`}
          style={{ backgroundColor: elem.color }}
          onClick={() => this.props.changeColor(elem.colorName)}
        />
      );
    });
    return <ul className="product-colors">{colors}</ul>;
  }
}
