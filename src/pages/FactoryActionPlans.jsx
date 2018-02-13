/* global domtoimage */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import NProgress from 'nprogress';

import Poly from './../utils/i18n';
import loadScript from './../utils/loadScript';
import { timeCell, lotCell } from '../utils/customTableCells';

import Header from '../components/Header';
import CardHeader from '../components/CardHeader';
import DownloadButtonDropdown from '../components/DownloadButtonDropdown';

import {
  getFactoryActionPlans,
} from './../actions/factoryActions';


class FactoryActionPlans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: -1,
      loading: false,
    };

    this.columns = [{
      Header: Poly.t('Date'),
      id: 'createdAt',
      accessor: r => r.get('createdAt'),
      Cell: timeCell,
      maxWidth: 140,
    }, {
      Header: Poly.t('Lot Number'),
      id: 'lot',
      accessor: r => r.getIn(['score', 'lot']),
      Cell: lotCell,
      maxWidth: 140,
    }, {
      Header: Poly.t('Product'),
      id: 'product',
      accessor: r => r.getIn(['product', 'name']),
      maxWidth: 140,
    }, {
      Header: Poly.t('Problem or issue'),
      id: 'cause',
      className: 'left',
      headerClassName: 'left',
      style: {
        padding: '0 17px 0 17px',
      },
      headerStyle: {
        padding: '0 17px 0 17px',
      },
      accessor: r => r.get('cause'),
    }, {
      Header: Poly.t('Correction'),
      id: 'correction',
      className: 'left',
      headerClassName: 'left',
      style: {
        padding: '0 17px 0 17px',
      },
      headerStyle: {
        padding: '0 17px 0 17px',
      },
      accessor: r => r.get('correction'),
    }];

    this.handleDownload = this.handleDownload.bind(this);
    this.downloadPNG = this.downloadPNG.bind(this);
    this.loadPNGDownloadScript = this.loadPNGDownloadScript.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handleDownload(e, v) {
    if (v === 'png') return this.downloadPNG();
    const factorySlug = this.props.match.params.factory;
    window.location = `/api/factories/${factorySlug}/action-plans/download/${v}`;
  }

  downloadPNG() {
    if (NProgress.status !== null) NProgress.done();
    if (typeof domtoimage === 'undefined') { return this.loadPNGDownloadScript(); }
    const el = document.getElementsByClassName('rt-table')[0];
    const fileName = `action-plans-${Date.now()}.png`;
    domtoimage.toBlob(el)
      .then(blob => window.saveAs(blob, fileName));
  }

  loadPNGDownloadScript() {
    const script = '/lib-js/dom-to-image-filesaver.min.js';
    loadScript(script, this.downloadPNG);
  }

  fetchData(state) {
    const factorySlug = this.props.match.params.factory;
    this.props.dispatch(getFactoryActionPlans(factorySlug, state.page, state.pageSize));
  }

  render() {
    const { factoryInfo } = this.props;
    const { actionPlans } = this.props;
    const { factory: factorySlug } = this.props.match.params;
    return (
      <div className="action-plans">
        <Header
          crumb={[{
            name: (factoryInfo && factoryInfo.get('name')),
            to: `/factory/${factorySlug}`,
          }, {
            name: Poly.t('Action Plans'),
            to: `/factory/${factorySlug}/action-plans`,
          }]}
        />
        <div className="card card-2 card-header">
          <CardHeader
            title={Poly.t('Action Plans')}
            subtitle={factoryInfo && factoryInfo.get('address')}
          />
        </div>
        <div className="card card-2 action-plans">
          <div className="row card-btn-row">
            <div className="col-6 no-margin-i" />
            <div className="col-6 no-margin-i float-right-i">
              <DownloadButtonDropdown
                handleDownload={this.handleDownload}
              />
            </div>
          </div>
          <ReactTable
            className="center custom-table"
            data={actionPlans && actionPlans.get('actionPlans').toArray()}
            pages={actionPlans && actionPlans.get('pageCount')}
            columns={this.columns}
            defaultPageSize={5}
            manual
            loading={this.state.loading}
            onFetchData={this.fetchData}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { factory } = ownProps.match.params;
  return {
    factoryInfo: state.getIn(['factories', factory, 'info']),
    actionPlans: state.getIn(['factories', factory, 'actionPlans']),
  };
}

export default connect(mapStateToProps)(FactoryActionPlans);
