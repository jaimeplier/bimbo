import React, { Component } from 'react';
import Poly from './../utils/i18n';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Modal from './Modal';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false
    }

    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.createdUser = this.createdUser.bind(this)
  }

  showModal() {
    this.setState({isShown: true})
  }
  hideModal() {
    this.setState({isShown: false, success: false, user: {}})
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  createdUser(user) {
    this.setState({user, success: true})
  }

  handleSubmit() {
    this.setState({errors: {}});
    if(!this.state.name) return this.setState({errors:{name:'Nombre requerido'}});
    this.props.submit(this.state.name, this.createdUser)
  }

  render() {
    return (
      <div className="create-user">
        <RaisedButton
          label={Poly.t("Create User")}
          primary={true}
          onClick={this.showModal}
        />
        <Modal
          show={this.state.isShown}
          onHide={this.hideModal}
        >
          <div className="left modal-content card-padding" >
            <p className="card-title inline">{Poly.t("Create User")}</p>
            <button className="button grey-btn" onClick={this.hideModal}>X</button>
            { !this.state.success ?
              <div>
                <TextField
                  className="input"
                  name="name"
                  errorText={this.state.errors && this.state.errors.name}
                  onChange={this.handleInputChange.bind(this)}
                  floatingLabelText={Poly.t('Name')}
                />
                <div className="float-fix">
                  <RaisedButton
                    label={Poly.t('Create')}
                    primary={true}
                    className="float-right"
                    onClick={this.handleSubmit}
                  />
                </div>
              </div>
            :
              <div>
                <p>{Poly.t('Successfully created user')}</p>
                <p>{Poly.t('User PIN')}: {this.state.user.accessPin}</p>
              </div>
            }
          </div>
        </Modal>
      </div>
    )
  }
}

