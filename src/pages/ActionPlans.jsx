import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import { timeCell, lotCell } from '../utils/customTableCells';

import {
  Download
} from 'react-feather';

import Header from '../components/Header';

import {
  getFactoryActionPlans,
} from './../actions/factoryActions';

const columns = [{
  Header: 'Fecha',
  accessor: 'createdAt',
  Cell: timeCell,
  maxWidth: 160,
}, {
  Header: 'No. Lote',
  accessor: 'score.lot',
  Cell: lotCell,
  maxWidth: 160,
}, {
  Header: 'Problema ó situación',
  accessor: 'cause',
}, {
  Header: 'Solución',
  accessor: 'correction',
}]

class ActionPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    }
  }

  componentWillMount() {
    this.props.dispatch(getFactoryActionPlans(
      this.props.match.params.factory
    ))
  }

  render() {
    return (
      <div className="action-plans">
        <Header />
        <div className="card card-2 action-plans">
          <div className="row">
            <div className="col-6 no-margin-i">
              <p className="card-title">Pan Blanco</p>
              <p className="small-text">Acapotzalco, CDMX</p>
            </div>
            <div className="col-6 no-margin-i float-right-i">
              <a
                className="float-right button grey-btn"
                href="/api/action-plans/download"
              >
                <Download />
              </a>
            </div>
          </div>
          <ReactTable
            className="center custom-table"
            data={this.state.tableData}
            columns={columns}
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
    factoryInfo: state.getIn(['factories', factory, 'info']),
    actionPlans: state.getIn(['factories', factory, 'actionPlans']),
  }
}

export default connect(mapStateToProps)(ActionPlans);

