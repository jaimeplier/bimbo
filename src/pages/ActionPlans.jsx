import React, { Component } from 'react';
import ReactTable from 'react-table';
import { sendGetRequest } from '../utils/customRequests';

import { timeCell, lotCell } from '../utils/customTableCells';

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

export default class ActionPlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    }
  }

  componentWillMount() {
    sendGetRequest('/api/action-plans', (data) => {
      this.setState({tableData: data.actionPlans});
    })
  }

  render() {
    return (
      <div className="card card-2 action-plans">
        <p className="card-title">Pan Blanco</p>
        <p className="small-text">Acapotzalco, CDMX</p>
        <ReactTable
          className="center custom-table"
          data={this.state.tableData}
          columns={columns}
          showPagination={false}
          showPageSizeOptions={false}
        />
      </div>
    )
  }
}
