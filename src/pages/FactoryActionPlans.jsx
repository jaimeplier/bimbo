/*global domtoimage*/

import React, { Component } from 'react';
import Poly from './../utils/i18n';
import loadScript from './../utils/loadScript.js';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import NProgress from 'nprogress';


import { timeCell, lotCell } from '../utils/customTableCells';

import Header from '../components/Header';
import CardHeader from '../components/CardHeader';
import DownloadButtonDropdown from '../components/DownloadButtonDropdown';

import {
  getFactoryActionPlans,
} from './../actions/factoryActions';


class FactoryActionPlans extends Component {
  constructor(props) {
    super(props)

    this.columns = [{
      Header: Poly.t('Date'),
      id: 'createdAt',
      accessor: (r) => r.get('createdAt'),
      Cell: timeCell,
    }, {
      Header: Poly.t('Lot Number'),
      id: 'lot',
      accessor: (r) => r.getIn(['score', 'lot']),
      Cell: lotCell,
      maxWidth: 160,
    }, {
      Header: Poly.t('Product'),
      id: 'product',
      accessor: (r) => r.getIn(['product', 'name']),
    }, {
      Header: Poly.t('Cause'),
      id: 'cause',
      accessor: (r) => r.get('cause'),
    }, {
      Header: Poly.t('Correction'),
      id: 'correction',
      accessor: (r) => r.get('correction'),
    }]

    this.handleDownload = this.handleDownload.bind(this)
    this.downloadPNG = this.downloadPNG.bind(this)
    this.loadPNGDownloadScript = this.loadPNGDownloadScript.bind(this)
  }

  componentWillMount() {
    const factorySlug = this.props.match.params.factory;
    this.props.dispatch(getFactoryActionPlans(factorySlug))
  }

  handleDownload(e, v) {
    if(v === 'png') return this.downloadPNG();
    const factorySlug = this.props.match.params.factory;
    window.location = "/api/factories/"+ factorySlug +"/action-plans/download/" + v
  }

  downloadPNG() {
    if(NProgress.status !== null) NProgress.done()
    if(typeof domtoimage === 'undefined')
      return this.loadPNGDownloadScript()
    var el = document.getElementsByClassName('rt-table')[0]
    const fileName = 'action-plans-'+ Date.now() +'.png'
    domtoimage.toBlob(el)
      .then(blob => window.saveAs(blob, fileName))
  }

  loadPNGDownloadScript() {
    const script = '/lib-js/dom-to-image-filesaver.min.js'
    loadScript(script, this.downloadPNG)
  }

  render() {
    const factoryInfo = this.props.factoryInfo
    const actionPlans = this.props.actionPlans;
    const factorySlug = this.props.match.params.factory;
    return (
      <div className="action-plans">
        <Header
          crumb={[{
            name: (factoryInfo && factoryInfo.get('name')),
            to: '/factory/'+factorySlug,
          }, {
            name: Poly.t('Action Plans'),
            to: '/factory/'+factorySlug+'/action-plans',
          }]}
        />
        <div className="card card-2">
          <CardHeader
            title={Poly.t('Action Plans')}
            subtitle={factoryInfo && factoryInfo.get('address')}
          />
        </div>
        <div className="card card-2 action-plans">
          <div className="row card-btn-row">
            <div className="col-6 no-margin-i">
            </div>
            <div className="col-6 no-margin-i float-right-i">
              <DownloadButtonDropdown
                handleDownload={this.handleDownload}
              />
            </div>
          </div>
          <ReactTable
            className="center custom-table"
            data={actionPlans && actionPlans.toArray()}
            columns={this.columns}
            showPagination={false}
            showPageSizeOptions={false}
            pageSize={actionPlans && actionPlans.toArray().length}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const factory = ownProps.match.params.factory;
  return {
    factoryInfo: state.getIn(['factories', factory, 'info']),
    actionPlans: state.getIn(['factories', factory, 'actionPlans']),
  }
}

export default connect(mapStateToProps)(FactoryActionPlans);
