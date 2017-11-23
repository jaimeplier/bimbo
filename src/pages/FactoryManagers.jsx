import React, { Component } from 'react';
import Poly from './../utils/i18n';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import Header from './../components/Header';
import CardHeader from './../components/CardHeader';
import CreateUser from './../components/CreateUser';

import {
  createFactoryManager,
  getFactoryManagers,
} from './../actions/factoryActions';

import { timeCell } from '../utils/customTableCells';

class FactoryManagers extends Component {
  constructor(props) {
    super(props)

    this.columns = [{
      Header: Poly.t('Profile Picture'),
      id: 'picture',
      accessor: (r) => '',
    }, {
      Header: Poly.t('Name'),
      id: 'name',
      accessor: (r) => r.get('name'),
    }, {
      Header: Poly.t('Email'),
      id: 'email',
      accessor: (r) => r.get('email'),
    }, {
      Header: Poly.t('Last Activity'),
      id: 'lastActivity',
      accessor: (r) => r.get('lastActivity') || Poly.t('No Activity'),
    }]

    this.createManager = this.createManager.bind(this)
  }

  componentWillMount() {
    const factorySlug = this.props.match.params.factory
    this.props.dispatch(getFactoryManagers(factorySlug))
  }

  createManager(reqObj, callback) {
    const factory = this.props.match.params.factory
    this.props.dispatch(createFactoryManager(factory, reqObj, callback))
  }

  render() {
    const factoryInfo = this.props.factoryInfo
    const factorySlug = this.props.match.params.factory
    const managers = this.props.managers
    return (
      <div className="factory-managers">
        <Header
          crumb={[{
            name: (factoryInfo && factoryInfo.get('name')),
            to: '/factory/'+factorySlug,
          }, {
            name: Poly.t('Managers'),
            to: '/factory/'+factorySlug+'/managers',
          }]}
        />
        <div className="card card-2">
          <CardHeader
            title={Poly.t('Managers')}
            subtitle={factoryInfo && factoryInfo.get('address')}
            rightContent={<CreateUser
              type="manager"
              submit={this.createManager}
            />}
          />
        </div>
        <div className="card card-2">
          <ReactTable
            className="center custom-table"
            data={managers && managers.toArray()}
            columns={this.columns}
            showPagination={false}
            showPageSizeOptions={false}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const factory = ownProps.match.params.factory;
  return {
    managers: state.getIn(['factories', factory, 'managers']),
    factoryInfo: state.getIn(['factories', factory, 'info']),
  }
}


export default connect(mapStateToProps)(FactoryManagers)
