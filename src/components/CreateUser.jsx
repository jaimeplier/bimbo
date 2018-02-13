import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Poly from './../utils/i18n';

import Modal from './Modal';

import Form from './Form';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createdUser = this.createdUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  showModal() {
    this.setState({ isShown: true });
  }
  hideModal() {
    this.setState({ isShown: false, success: false, user: {} });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  createdUser(user) {
    this.setState({ user, success: true });
  }

  handleSubmit() {
    if (this.state.isShown) {
      const { type } = this.props;
      this.setState({ errors: {} });
      if (!this.state.name) return this.setState({ errors: { name: 'Nombre requerido' } });
      if (
        type === 'manager' &&
        !this.state.email
      ) return this.setState({ errors: { email: 'Correo requerido' } });
      this.props.submit({
        name: this.state.name,
        email: this.state.email,
        language: 'es',
      }, this.createdUser);
      this.setState({ name: '', email: '' });
    }
  }

  copyToClipboard() {
    const textField = document.createElement('textarea');
    textField.innerText = this.state.user.accessPin;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  render() {
    return (
      <div className="create-user">
        <RaisedButton
          label={Poly.t('Create User')}
          primary
          onClick={this.showModal}
        />
        <Modal
          show={this.state.isShown}
          onHide={this.hideModal}
        >
          <div className="left modal-content card-padding" >
            <p className="card-title inline">{Poly.t('Create User')}</p>
            <button className="button grey-btn" onClick={this.hideModal}>X</button>
            { !this.state.success ?
              <Form onSubmit={this.handleSubmit}>
                <TextField
                  className="input"
                  name="name"
                  errorText={this.state.errors && this.state.errors.name}
                  onChange={this.handleInputChange}
                  floatingLabelText={Poly.t('Name')}
                />
                { this.props.type === 'manager' ?
                  <TextField
                    className="input"
                    name="email"
                    errorText={this.state.errors && this.state.errors.name}
                    onChange={this.handleInputChange}
                    floatingLabelText={Poly.t('Email')}
                  />
                : null }
                <div className="float-fix">
                  <RaisedButton
                    label={Poly.t('Create')}
                    primary
                    className="float-right"
                    type="submit"
                  />
                </div>
              </Form>
            :
              <div>
                <p>{Poly.t('Successfully created user')}</p>
                { this.props.type === 'factory' ?
                  <div>
                    <p>
                      {Poly.t('User PIN')}: {this.state.user.accessPin}
                    </p>
                    <RaisedButton
                      label={Poly.t('Copy to clipboard')}
                      primary
                      onClick={this.copyToClipboard}
                    />
                  </div>
                : null }
                { this.props.type === 'manager' ?
                  <p>
                    { Poly.t('Registration instructions sent to')}: { this.state.user.email }
                  </p>
                : null }
              </div>
            }
          </div>
        </Modal>
      </div>
    );
  }
}
