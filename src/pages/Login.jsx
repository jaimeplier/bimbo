import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import isEmail from 'validator/lib/isEmail';
import { sendPostRequest } from './../utils/customRequests';
import images from './../assets';



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

    this.setState({errors: {general:"", password:"", confirmPassword:""}});

    if(!isEmail(this.state.email)) return this.setState({errors:{email:"Please use valid email"}});
    if(this.state.password.length < 5) return this.setState({errors:{password:"Password is too short"}});

    const body = {
      email: this.state.email,
      password: this.state.password
    }

    sendPostRequest("/api/users/log-in", body, (json) => {
      if(json.err) return this.setState({errors: json.errors});
      this.props.history.push("/");
    }, (s) => this.setState({errors:{general: s}}));
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
              <img className="bimbo-logo" src={images.bimboLogo} alt='' />
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
