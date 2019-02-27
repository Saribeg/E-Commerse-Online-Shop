import React, { Component} from "react";
import "./product-counter.scss";

export default class ProductCounter extends Component {
	state = {
			value: 0
	}

	increaseCount = (maxcount) => {
			let existValue = this.state.value;
			if (existValue > (maxcount -1)){
				return;
			}
			++existValue;
			this.setState({
				value: existValue
			})
	}

	decreaseCount = () => {
		let existValue = this.state.value;
		if( existValue <=0 ){
			return;
		}		
		existValue--;
		this.setState({
			value: existValue
		})
	}
  render() {
    return (
			<div className="product-counter">
			<button className="product-counter-btn" onClick={this.decreaseCount}>-</button>
			<span className="product-counter-value">{this.state.value}</span>
			<button className="product-counter-btn" onClick={() => this.increaseCount(this.props.maxCount)}>+</button>
	</div>
    );
  }
}
