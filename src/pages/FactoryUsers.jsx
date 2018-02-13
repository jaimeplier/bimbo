import React, { Component } from 'react';
import { connect } from 'react-redux';

import Poly from '../utils/i18n';
import CreateUser from './../components/CreateUser';

import { formatDate } from '../utils/customTableCells';
import Header from '../components/Header';
import CardHeader from '../components/CardHeader';

import {
  getFactoryUsers,
  createFactoryUser,
} from './../actions/factoryActions';


class FactoryUsers extends Component {
  constructor(props) {
    super(props);
    this.createUser = this.createUser.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getFactoryUsers(this.props.match.params.factory));
  }

  createUser(name, callback) {
    const { factory } = this.props.match.params;
    this.props.dispatch(createFactoryUser(factory, name, callback));
  }

  render() {
    const { factoryInfo } = this.props;
    const factorySlug = this.props.match.params.factory;
    return (
      <div className="factory-users">
        <Header
          crumb={[{
            name: (factoryInfo && factoryInfo.get('name')),
            to: `/factory/${factorySlug}`,
          }, {
            name: Poly.t('Scorers'),
            to: `/factory/${factorySlug}/scorers`,
          }]}
        />
        <div className="card card-2 card-header">
          <CardHeader
            title={Poly.t('Users')}
            subtitle={factoryInfo && factoryInfo.get('address')}
            rightContent={<CreateUser
              type="factory"
              submit={this.createUser}
            />}
          />
        </div>
        { this.props.users ?
            this.props.users.map(user => (
              <div className="card card-2 user-card" key={user.get('id')} >
                <div className="row user-card-title">
                  <div className="col-6 no-margin-i">
                    <p className="card-title">{user.get('name')}</p>
                  </div>
                  <div className="col-6 right" />
                </div>
                <div className="row">
                  <div className="user-image-container no-margin-i">
                    <div
                      className="user-image"
                      style={{ backgroundImage: `url(${user.get('picture')})` }}
                    />
                    <p className="center image-under-text">{Poly.t('Last Activity')}:</p>
                    <p className="center no-margin image-small-text">
                      {
                        user.get('lastActivity') ?
                          formatDate(user.get('lastActivity')).time
                          :
                          'Sin activar'
                        }
                      <br />
                      {
                        user.get('lastActivity') ?
                          formatDate(user.get('lastActivity')).date
                          :
                          ' '
                        }
                    </p>
                  </div>
                  <div className="activity-container">
                    <div className="row">
                      <div className="column activity-header line line-bottom line-right">
                        <p>{Poly.t('Action')}</p>
                      </div>
                      <div className="column activity-header header line line-bottom">
                        <p>{Poly.t('Time')}</p>
                      </div>
                      { user && user.get('scores').map(score => (
                        <div className="row" key={score.get('lot')}>
                          <div className="column line line-bottom line-right">
                            <p>{Poly.t('Scored Lot')}: {score.get('lot')}</p>
                          </div>
                          <div className="column line line-bottom">
                            <p>{`${formatDate(score.get('createdAt')).date} ${formatDate(score.get('createdAt')).time}` }</p>
                          </div>
                        </div>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
              ))
        : null }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { factory } = ownProps.match.params;
  return {
    users: state.getIn(['factories', factory, 'employees']),
    factoryInfo: state.getIn(['factories', factory, 'info']),
  };
}

export default connect(mapStateToProps)(FactoryUsers);
