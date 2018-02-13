import React, { Component } from 'react';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSubmit();
  }

  render() {
    return (
      <form
        onSubmit={this.submit}
      >
        { this.props.children }
      </form>
    );
  }
}
