import React, {Component} from "react";
import "./ScrollBtn.scss"

export default class ScrollBtn extends Component {
    state = {
        intervalId: 0
    };
    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
        // window.scroll(0, 0);
    }
    scrollToTop() {
        let intervalId = setInterval(()=> this.scrollStep(), this.props.delayInMs);
        this.setState({
            intervalId: intervalId
        });
    }

    render() {
        return (
            <button title="Back to top" className="scroll"
                    onClick={() => {
                        this.scrollToTop();
                    }}>&#8593;
            </button>
        )
    }
}