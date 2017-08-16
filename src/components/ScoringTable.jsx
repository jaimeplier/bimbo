import React, { Component } from 'react';
import { sendGetRequest } from '../utils/customRequests';
import ReactTable from 'react-table';
import { ReactTableDefaults } from 'react-table';

function scoreCell(row) {
  return (
    <div className={row.value + ' score-td'}>{ row.value }</div>
  )
}

function lotCell(row) {
  return (
    <div className={'lot-number score-td'}>{ row.value }</div>
  )
}

const columns = [{
  Header: 'Time',
  accessor: 'created_at',
  Cell: scoreCell,
}, {
  Header: 'Lot #',
  accessor: 'result.batchNumber',
  Cell: lotCell,
}, {
  id: 'hermeticidad',
  Header: 'Hermeticidad',
  accessor: e => e.result.attributes[0].score,
  Cell: scoreCell,
}, {
  id: 'Caracteristicas Fisicas',
  Header: 'Caracteristicas Fisicas',
  accessor: e => e.result.attributes[1].score,
  Cell: scoreCell,
}, {
  id: 'Tamano',
  Header: 'Tamaño',
  accessor: e => e.result.attributes[2].score,
  Cell: scoreCell,
}, {
  id: 'Limpieza',
  Header: 'Limpieza',
  accessor: e => e.result.attributes[3].score,
  Cell: scoreCell,
}, {
  id: 'Promociones',
  Header: 'Promociones',
  accessor: e => e.result.attributes[4].score,
  Cell: scoreCell,
}, {
  id: 'Condiciones Fisicas',
  Header: 'Condiciones Fisicas',
  accessor: e => e.result.attributes[5].score,
  Cell: scoreCell,
}, {
  id: 'Color del Empaque',
  Header: 'Color del Empaque',
  accessor: e => e.result.attributes[6].score,
  Cell: scoreCell,
}, {
  id: 'Olor',
  Header: 'Olor',
  accessor: e => e.result.attributes[7].score,
  Cell: scoreCell,
}, {
  id: 'Sabor',
  Header: 'Sabor',
  accessor: e => e.result.attributes[8].score,
  Cell: scoreCell,
}, {
  id: 'Comestiblidad / Textura',
  Header: 'Comestiblidad / Textura',
  accessor: e => e.result.attributes[9].score,
  Cell: scoreCell,
}, {
  id: 'Inocuidad',
  Header: 'Inocuidad',
  accessor: e => e.result.attributes[10].score,
  Cell: scoreCell,
}, {
  id: 'Peso',
  Header: 'Peso',
  accessor: e => e.result.attributes[11].score,
  Cell: scoreCell,
}, {
  id: 'Simetria',
  Header: 'Simetría',
  accessor: e => e.result.attributes[12].score,
  Cell: scoreCell,
}, {
  id: 'Numero de rebanadas',
  Header: 'Numero de rebanadas',
  accessor: e => e.result.attributes[13].score,
  Cell: scoreCell,
}, {
  id: 'corteza / pizo',
  Header: 'Corteza / Pizo',
  accessor: e => e.result.attributes[14].score,
  Cell: scoreCell,
}, {
  id: 'tamano',
  Header: 'Tamaño',
  accessor: e => e.result.attributes[15].score,
  Cell: scoreCell,
}, {
  id: 'color',
  Header: 'Color',
  accessor: e => e.result.attributes[16].score,
  Cell: scoreCell,
}, {
  id: 'Consistencia',
  Header: 'Consistencia',
  accessor: e => e.result.attributes[17].score,
  Cell: scoreCell,
}];

Object.assign(ReactTableDefaults.column, {
  minWidth: 200,
});

export default class ScoringTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    }

    sendGetRequest('/api/scores', (data) => {
      this.setState({tableData: data.scores});
    })
  }

  tdStyle(state, rowInfo, column) {
    let style = '';
    const value = rowInfo && rowInfo.row && rowInfo.row[column.id];

    switch(value) {
      case 'success':
        style = 'success';
        break;
      case 'warning':
        style = 'warning';
        break;
      case 'failure':
        style = 'failure';
        break;
    }

    return {className: style};
  }

  render() {
    return (
      <div className="card card-2 scoring-table">
        <p className="card-title">Pan Blanco</p>
        <p className="small-text">Acapotzalco, CDMX</p>
        <ReactTable
          className="center -striped"
          data={this.state.tableData}
          columns={columns}
          showPagination={false}
          showPageSizeOptions={false}
        />
      </div>
    )
  }
}


