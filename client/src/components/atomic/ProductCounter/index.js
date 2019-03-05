// @flow

import * as React from "react";
import "./product-counter.scss";

type Props = {
  maxCount: number,
};

type State = {
  value: number,
};

export default class ProductCounter extends React.Component<Props, State> {
	state = {
		value: 0,			
	}

	handleChange = (event) => {
    this.setState({value: event.target.value});
  }

	increaseCount = (maxcount) => {
			let existValue = this.state.value;
			if (existValue > (maxcount - 1)){
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

		let inputValue = this.state.value;

		if(inputValue > this.props.maxCount){
			this.setState({
				value: this.props.maxCount
			})
		}

		if (typeof inputValue !== 'number'){
			this.setState({
				value: this.props.maxCount
			})
		}
		
    return (
			<div className="product-counter">
			<button className="product-counter-btn" onClick={this.decreaseCount}>-</button>
			<input type="tel" className="product-counter-value" value={this.state.value} onInput={this.handleChange}/>
			<button className="product-counter-btn" onClick={() => this.increaseCount(this.props.maxCount)}>+</button>
	</div>
    );
  }
}
