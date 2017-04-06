import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import isEmail from 'validator/lib/isEmail';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        general: "",
        email: "",
        password: "",
      }
    };
  }

  _handleSubmit() {
    console.log("sending: ", this.state);
  }

  _handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }


  render() {
    return (
      <div className="auth">
        <Card className="col-7 card">
          <div className="row">
            <div  className="col-12 center">
              <img className="bimbo-logo" src={require("./../../public/bimbo_logo.png")} />
            </div>
            <div className="col-12 center">
              <TextField
                className="input"
                name="email"
                errorText={this.state.errors.email}
                onChange={this._handleInputChange.bind(this)}
                floatingLabelText="Email" />
            </div>
            <div className="col-12 center">
              <TextField
                className="input"
                type="password"
                name="password"
                errorText={this.state.errors.password}
                onChange={this._handleInputChange.bind(this)}
                floatingLabelText="Password" />
            </div>
            <div className="col-12">
              <RaisedButton
                label="Log In"
                fullWidth={true}
                primary={true}
                onTouchTap={this._handleSubmit.bind(this)}
              />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
