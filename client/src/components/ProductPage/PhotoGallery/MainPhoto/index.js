import React, { Component, Fragment } from "react";

export default class MainPhoto extends Component {
  render() {
    return (
        <div className="photo-main"><img src={this.props.activePhotoSrc} alt="img" /></div>
    );
  }
}
