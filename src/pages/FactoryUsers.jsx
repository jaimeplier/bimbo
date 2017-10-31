import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import {
  getFactoryUsers,
} from './../actions/factoryActions';

import { formatDate } from '../utils/customTableCells';



class FactoryUsers extends Component {

  componentWillMount() {
    this.props.dispatch(getFactoryUsers());
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
              <RaisedButton
                label="Crear Usuario"
                primary={true}
              />
            </div>
          </div>
        </div>
        { this.props.users ?
            this.props.users.map((user) => {
              return (
                <div className="card card-2">
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
