import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import Poly from './../utils/i18n';

import Header from './../components/Header';
import CardHeader from './../components/CardHeader';
import CreateUser from './../components/CreateUser';

import {
  createFactoryManager,
  getFactoryManagers,
} from './../actions/factoryActions';


class FactoryManagers extends Component {
  constructor(props) {
    super(props);

    this.columns = [{
      Header: Poly.t('Profile Picture'),
      id: 'picture',
      Cell: this.profilePicCell,
    }, {
      Header: Poly.t('Name'),
      id: 'name',
      accessor: r => r.get('name'),
    }, {
      Header: Poly.t('Email'),
      id: 'email',
      accessor: r => r.get('email'),
    }, {
      Header: Poly.t('Last Activity'),
      id: 'lastActivity',
      accessor: r => r.get('lastActivity') || Poly.t('No Activity'),
    }];

    this.createManager = this.createManager.bind(this);
  }

  componentWillMount() {
    const factorySlug = this.props.match.params.factory;
    this.props.dispatch(getFactoryManagers(factorySlug));
  }

  createManager(reqObj, callback) {
    const { factory } = this.props.match.params;
    this.props.dispatch(createFactoryManager(factory, reqObj, callback));
  }

  profilePicCell(row) {
    return (<div
      className="profile-pic"
      style={{ backgroundImage: row.value ? `url(${row.value})` : '' }}
    />);
  }

  render() {
    const { factoryInfo } = this.props;
    const { factory: factorySlug } = this.props.match.params;
    const { managers } = this.props;
    return (
      <div className="factory-managers">
        <Header
          crumb={[{
            name: (factoryInfo && factoryInfo.get('name')),
            to: `/factory/${factorySlug}`,
          }, {
            name: Poly.t('Managers'),
            to: `/factory/${factorySlug}/managers`,
          }]}
        />
        <div className="card card-2 card-header">
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
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { factory } = ownProps.match.params;
  return {
    managers: state.getIn(['factories', factory, 'managers']),
    factoryInfo: state.getIn(['factories', factory, 'info']),
  };
}


export default connect(mapStateToProps)(FactoryManagers);
