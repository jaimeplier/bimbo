import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateUser from './../components/CreateUser';

import {
  getFactoryUsers,
  createFactoryUser,
} from './../actions/factoryActions';

import { formatDate } from '../utils/customTableCells';



class FactoryUsers extends Component {
  constructor(props) {
    super(props);
    this.createUser = this.createUser.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(getFactoryUsers());
  }

  createUser(name, callback) {
    this.props.dispatch(createFactoryUser(name, callback))
  }

  render() {
    return (
      <div className="factory-users">
        <div className="card card-2">
          <div className="row">
            <div className="col-6">
              <p className="card-title">Usuarios</p>
              <p className="small-text" style={{marginBottom: '0px'}}>Azcapotzalco, CDMX</p>
            </div>
            <div className="col-6 right">
              <CreateUser
                type="factory"
                submit={this.createUser}
              />

            </div>
          </div>
        </div>
        { this.props.users ?
            this.props.users.map((user, i) => {
              return (
                <div className="card card-2" key={user.get('id')} >
                  <div className="row">
                    <div className="col-6">
                      <p className="card-title">{user.get('name')}</p>
                    </div>
                    <div className="col-6">
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <div
                        className="user-image"
                        style={{backgroundImage: 'url('+user.get('picture')+')'}}
                      />
                      <p className="center">Última actividad:</p>
                      <p className="center">{ formatDate(user.get('lastActivity')) }</p>
                    </div>
                    <div className="col-9">
                    </div>
                  </div>
                </div>
              )
            })
        : null }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.get('employees')
  }
}

export default connect(mapStateToProps)(FactoryUsers);
