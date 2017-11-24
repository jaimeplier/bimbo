import React, { Component } from 'react';
import { updatePoly } from './../utils/i18n';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { sendPostRequest } from './../utils/customRequests';

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
      }
    };
  }

  _handleSubmit() {
    this.setState({errors: {general:'', email:'', password: ''}});

    if(!isEmail(this.state.email)) return this.setState({errors:{email:'Please use valid email'}});
    if(this.state.password.length < 5) return this.setState({errors:{password:'Password is too short'}});

    const body = {
      email: this.state.email,
      password: this.state.password
    }

    sendPostRequest('/api/users/log-in', body, (json) => {
      if(json.err) return this.setState({errors: json.errors});
      updatePoly(() => {
        this.props.dispatch(setUser(json.user));
        // if(user)
        this.props.history.push('/');
      })
    }, (s) => {
      console.log('the error: ', s);
      this.setState({errors:{general: s}})
    });
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
              <img className="bimbo-logo" src={images.bimboLogo} alt='' />
            </div>
            <div className="col-12 center">
              <p className="error">{ this.state.errors.general}</p>
              <TextField
                className="input"
                name="email"
                errorText={this.state.errors && this.state.errors.email}
                onChange={this._handleInputChange.bind(this)}
                floatingLabelText="Email" />
            </div>
            <div className="col-12 center">
              <TextField
                className="input"
                type="password"
                name="password"
                errorText={this.state.errors && this.state.errors.password}
                onChange={this._handleInputChange.bind(this)}
                floatingLabelText="Password" />
            </div>
            <div className="col-12">
              <RaisedButton
                label="Log In"
                fullWidth={true}
                primary={true}
                onClick={this._handleSubmit.bind(this)}
              />
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

export default connect(mapStateToProps)(Login);
