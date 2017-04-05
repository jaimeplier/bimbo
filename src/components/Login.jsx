import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



export default class Login extends Component {
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
                floatingLabelText="Email" />
            </div>
            <div className="col-12 center">
              <TextField
                className="input"
                type="password"
                floatingLabelText="Password" />
            </div>
            <div className="col-12">
              <RaisedButton label="Log In" fullWidth={true} primary={true} />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
