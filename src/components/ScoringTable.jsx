import React, { Component } from 'react';
import { sendGetRequest } from '../utils/customRequests';
import ReactTable from 'react-table';
import { ReactTableDefaults } from 'react-table';

import { timeCell, lotCell } from '../utils/customTableCells';

function scoreCell(row) {
  return (
    <div></div>
  )
}



const columns = [{
  Header: 'Fecha',
  accessor: 'createdAt',
  Cell: timeCell,
  maxWidth: 160,
}, {
  Header: 'No. Lote',
  accessor: 'lot',
  Cell: lotCell,
  maxWidth: 160,
}, {
  id: 'hermeticidad',
  Header: 'Hermeticidad',
  accessor: 'airTightness',
  Cell: scoreCell,
}, {
  id: 'Caracteristicas Fisicas',
  Header: 'Caracteristicas Fisicas',
  accessor: 'packaging',
  Cell: scoreCell,
}, {
  id: 'Tamano',
  Header: 'Tamaño',
  accessor: 'size',
  Cell: scoreCell,
}, {
  id: 'Limpieza',
  Header: 'Limpieza',
  accessor: 'cleanliness',
  Cell: scoreCell,
}, {
  id: 'Promociones',
  Header: 'Promociones',
  accessor: 'promotions',
  Cell: scoreCell,
}, {
  id: 'Condiciones Fisicas',
  Header: 'Condiciones Fisicas',
  accessor: 'product',
  Cell: scoreCell,
}, {
  id: 'Color del Empaque',
  Header: 'Color del Empaque',
  accessor: 'color',
  Cell: scoreCell,
}, {
  id: 'Olor',
  Header: 'Olor',
  accessor: 'scent',
  Cell: scoreCell,
}, {
  id: 'Sabor',
  Header: 'Sabor',
  accessor: 'taste',
  Cell: scoreCell,
}, {
  id: 'Comestiblidad / Textura',
  Header: 'Comestiblidad / Textura',
  accessor: 'edibility',
  Cell: scoreCell,
}, {
  id: 'Inocuidad',
  Header: 'Inocuidad',
  accessor: 'harmlessness',
  Cell: scoreCell,
}, {
  id: 'Peso',
  Header: 'Peso',
  accessor: 'weight',
  Cell: scoreCell,
}, {
  id: 'Simetria',
  Header: 'Simetría',
  accessor: 'symmetry',
  Cell: scoreCell,
}, {
  id: 'Numero de rebanadas',
  Header: 'Numero de rebanadas',
  accessor: 'slicing',
  Cell: scoreCell,
}, {
  id: 'corteza / pizo',
  Header: 'Corteza / Pizo',
  accessor: 'crust',
  Cell: scoreCell,
}, {
  id: 'tamano',
  Header: 'Tamaño',
  accessor: 'crumbSize',
  Cell: scoreCell,
}, {
  id: 'color',
  Header: 'Color',
  accessor: 'crumbColor',
  Cell: scoreCell,
}, {
  id: 'Consistencia',
  Header: 'Consistencia',
  accessor: 'crumbConsistency',
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

  }

  componentWillMount() {
    sendGetRequest('/api/scores', (data) => {
      this.setState({tableData: data.scores});
    })
  }

  tdStyle(state, rowInfo, column) {
    let style = '';
    const value = rowInfo && rowInfo.row && rowInfo.row[column.id];

    console.log("The value", value);

    switch(value) {
      case 'Success':
        style = 'success';
        break;
      case 'Warning':
        style = 'warning';
        break;
      case 'Failure':
        style = 'failure';
        break;
      default:
    }

    return {className: style};
  }

  getTdProps(state, rowInfo, column, instance) {
    let color = '';
    const value = rowInfo && rowInfo.row && rowInfo.row[column.id];

    if(value === "Success") color = "rgba(38, 194, 129, 0.22)";
    if(value === "Warning") color = "rgba(247, 202, 23, 0.22)";
    if(value === "Failure") color = "rgba(247, 23, 23, 0.22)";

    return { style: {backgroundColor: color} };
  }

  render() {
    return (
      <div className="card card-2 scoring-table">
        <p className="card-title">Pan Blanco</p>
        <p className="small-text">Acapotzalco, CDMX</p>
        <ReactTable
          className="center custom-table"
          data={this.state.tableData}
          columns={columns}
          getTdProps={this.getTdProps}
          showPagination={false}
          showPageSizeOptions={false}
        />
      </div>
    )
  }
}
