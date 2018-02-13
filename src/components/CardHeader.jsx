import React, { Component } from 'react';

export default class CardHeader extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-6">
          <p className="card-title">{this.props.title}</p>
          <p className="small-text">{this.props.subtitle}</p>
        </div>
        <div className={`col-6 right f-right-i ${this.props.noMargin ? 'no-margin-i' : ''}`}>
          {this.props.rightContent}
        </div>
      </div>
    );
  }
}
