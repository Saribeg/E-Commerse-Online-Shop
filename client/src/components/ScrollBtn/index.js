import React, {Component} from "react";
import { connect } from "react-redux";
import "./ScrollBtn.scss"

class ScrollBtn extends Component {
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
            <>
                {
                    (this.props.offsetY > 300) ?
                        <button title="Back to top" className="scroll"
                                onClick={() => {
                                    this.scrollToTop();
                                }}>&#8593;
                        </button>
                        : null
                }

            </>

        )
    }
}

const mapStateToProps = state => {
    return {
        offsetY: state.scroll.position
    };
};

export default connect(mapStateToProps)(ScrollBtn)