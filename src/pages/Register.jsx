import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import matches from 'validator/lib/matches';

import { sendPostRequest } from '../utils/customRequests';
import images from './../assets';

import { setUser } from '../actions/userActions';



class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      errors: {
        general: '',
        password: '',
        confirmPassword: '',
      }
    };
  }

  _handleSubmit() {
    this.setState({errors: {general:'', password:'', confirmPassword:''}});
    if(
      !this.state.password ||
      !matches(this.state.password, this.state.confirmPassword)
    ) {
      return this.setState({errors: {confirmPassword: 'Passwords do not match'}});
    }

    const body = {
      resetToken: this.props.match.params['token'],
      password: this.state.password
    }

    sendPostRequest('/api/users/register', body, (json) => {
      if(json.err) return this.setState({errors: json.errors});
      this.props.dispatch(setUser(json.user));
      this.props.history.push('/');
    }, (s) => this.setState({errors:{general: s}}));
  }

  _handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div className="auth">
        <div className="col-7 card">
          <div className="row">
            <div  className="col-12 center">
              <img className="bimbo-logo" src={images.bimboLogo} alt="" />
            </div>
            <div className="col-12 center">
              <p>Welcome</p>
              <p>To sign in please type your new password below</p>
              <p className="error">{ this.state.errors.general}</p>
            </div>
            <div className="col-12 center">
              <TextField
                className="input"
                name="password"
                onChange={this._handleInputChange.bind(this)}
                errorText={this.state.errors.password}
                type="password"
                floatingLabelText="New Password" />
            </div>
            <div className="col-12 center">
              <TextField
                className="input"
                name="confirmPassword"
                errorText={this.state.errors.confirmPassword}
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
        </div>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(Register);
