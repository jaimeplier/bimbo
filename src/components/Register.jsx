import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {password: "", confirmPassword: ""};
  }

  _handleSubmit() {
    console.log("The state: ", this.state);

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
              <img className="bimbo-logo" src={require("./../../public/bimbo_logo.png")} alt="" />
            </div>
            <div className="col-12 center">
              <p>Welcome</p>
              <p>To sign in please type your new password below</p>
            </div>
            <div className="col-12 center">
              <TextField
                className="input"
                name="password"
                onChange={this._handleInputChange.bind(this)}
                type="password"
                floatingLabelText="New Password" />
            </div>
            <div className="col-12 center">
              <TextField
                className="input"
                name="confirmPassword"
                onChange={this._handleInputChange.bind(this)}
                type="password"
                floatingLabelText="Confirm Password" />
            </div>
            <div className="col-12">
              <RaisedButton
                label="Sign In"
                fullWidth={true}
                onTouchTap={this._handleSubmit.bind(this)}
                primary={true} />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
