import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import { updatePoly } from './../utils/i18n';
import { sendPostRequest } from './../utils/customRequests';

import Form from './../components/Form';

import images from './../assets';

import { setUser } from '../actions/userActions';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        general: '',
        email: '',
        password: '',
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ errors: { general: '', email: '', password: '' } });

    if (!isEmail(this.state.email)) return this.setState({ errors: { email: 'Please use valid email' } });
    if (this.state.password.length < 5) return this.setState({ errors: { password: 'Password is too short' } });

    const body = {
      email: this.state.email,
      password: this.state.password,
    };

    sendPostRequest('/api/users/log-in', body, (json) => {
      if (json.err) return this.setState({ errors: json.errors });
      this.props.dispatch(setUser(json.user));
      updatePoly(() => {
        if (json.user.access === 'Admin') { return this.props.history.push(`/factory/${json.user.factorySlug}`); }
        this.props.history.push('/');
      });
    }, (s) => {
      console.log('the error: ', s);
      this.setState({ errors: { general: s } });
    });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    return (
      <div className="auth">
        <div className="col-4 card">
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-12 center">
                <img className="bimbo-logo" src={images.bimboLogo} alt="" />
              </div>
              <div className="col-12 center">
                <p className="error">{ this.state.errors.general}</p>
                <TextField
                  className="input"
                  name="email"
                  errorText={this.state.errors && this.state.errors.email}
                  onChange={this.handleInputChange}
                  floatingLabelText="Email"
                />
              </div>
              <div className="col-12 center">
                <TextField
                  className="input"
                  type="password"
                  name="password"
                  errorText={this.state.errors && this.state.errors.password}
                  onChange={this.handleInputChange}
                  floatingLabelText="Password"
                />
              </div>
              <div className="col-12">
                <RaisedButton
                  type="submit"
                  label="Log In"
                  fullWidth
                  primary
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
