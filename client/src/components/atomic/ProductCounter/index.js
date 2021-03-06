// @flow

import * as React from "react";
import {connect} from "react-redux";
import {SET_AMOUNT} from "../../../actions/addToCart";

import "./product-counter.scss";

type Props = {
    maxCount: number,
    setAmountAddCart: Function,
};

type State = {
    value: number,
};

class ProductCounter extends React.Component<Props, State> {
    state = {
        value: 1,
    }

    handleChange = (event: Object) => {

        this.props.setAmountAddCart(event.target.value);

        this.setState({value: event.target.value});
    }

    increaseCount = (maxcount: number) => {
        let existValue = this.state.value;
        if (existValue > (maxcount - 1)) {
            return;
        }
        ++existValue;
        this.props.setAmountAddCart(existValue);
        this.setState({
            value: existValue
        })
    }

    decreaseCount = () => {
        let existValue = this.state.value;
        if (existValue <= 1) {
            return;
        }
        existValue--;
        this.props.setAmountAddCart(existValue);
        this.setState({
            value: existValue
        })
    }

    render() {

        let inputValue = this.state.value;

        if (inputValue > this.props.maxCount && this.props.maxCount > 0) {
            this.setState({
                value: this.props.maxCount
            })
        }

        if (typeof inputValue !== 'number') {
            this.setState({
                value: this.props.maxCount
            })
        }

        return (
            <div className="product-counter">
                <button className="product-counter-btn" onClick={this.decreaseCount}>-</button>
                <input type="tel" className="product-counter-value" value={this.state.value}
                       onChange={this.handleChange} onInput={this.handleChange}/>
                <button className="product-counter-btn" onClick={() => this.increaseCount(this.props.maxCount)}>+
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        setAmountAddCart: (amount) => {
            dispatch({type: SET_AMOUNT, payload: {amount: amount}})
        },

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCounter);
