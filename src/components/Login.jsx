import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <FlatButton label="Default" />
      </div>
    )
  }
}
