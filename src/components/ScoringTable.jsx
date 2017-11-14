import React, { Component } from 'react';
import { sendGetRequest } from '../utils/customRequests';
import ReactTable from 'react-table';
import { ReactTableDefaults } from 'react-table';

import { timeCell, lotCell } from '../utils/customTableCells';

import {
  Download
} from 'react-feather';

function scoreCell(row) {
  return (
    <div></div>
  )
}



const columns = [{
  Header: 'Fecha',
  id: 'createdAt',
  accessor: (r) => r.get('createdAt'),
  Cell: timeCell,
  maxWidth: 160,
}, {
  Header: 'No. Lote',
  id: 'lot',
  accessor: (r) => r.get('lot'),
  Cell: lotCell,
  maxWidth: 160,
}, {
  id: 'hermeticidad',
  Header: 'Hermeticidad',
  accessor: (r) => r.get('airTightness'),
  Cell: scoreCell,
}, {
  id: 'Caracteristicas Fisicas',
  Header: 'Caracteristicas Fisicas',
  accessor: (r) => r.get('packaging'),
  Cell: scoreCell,
}, {
  id: 'Tamano',
  Header: 'Tamaño',
  accessor: (r) => r.get('size'),
  Cell: scoreCell,
}, {
  id: 'Limpieza',
  Header: 'Limpieza',
  accessor: (r) => r.get('cleanliness'),
  Cell: scoreCell,
}, {
  id: 'Promociones',
  Header: 'Promociones',
  accessor: (r) => r.get('promotions'),
  Cell: scoreCell,
}, {
  id: 'Condiciones Fisicas',
  Header: 'Condiciones Fisicas',
  accessor: (r) => r.get('product'),
  Cell: scoreCell,
}, {
  id: 'Color del Empaque',
  Header: 'Color del Empaque',
  accessor: (r) => r.get('color'),
  Cell: scoreCell,
}, {
  id: 'Olor',
  Header: 'Olor',
  accessor: (r) => r.get('scent'),
  Cell: scoreCell,
}, {
  id: 'Sabor',
  Header: 'Sabor',
  accessor: (r) => r.get('taste'),
  Cell: scoreCell,
}, {
  id: 'Comestiblidad / Textura',
  Header: 'Comestiblidad / Textura',
  accessor: (r) => r.get('edibility'),
  Cell: scoreCell,
}, {
  id: 'Inocuidad',
  Header: 'Inocuidad',
  accessor: (r) => r.get('harmlessness'),
  Cell: scoreCell,
}, {
  id: 'Peso',
  Header: 'Peso',
  accessor: (r) => r.get('weight'),
  Cell: scoreCell,
}, {
  id: 'Simetria',
  Header: 'Simetría',
  accessor: (r) => r.get('symmetry'),
  Cell: scoreCell,
}, {
  id: 'Numero de rebanadas',
  Header: 'Numero de rebanadas',
  accessor: (r) => r.get('slicing'),
  Cell: scoreCell,
}, {
  id: 'corteza / pizo',
  Header: 'Corteza / Pizo',
  accessor: (r) => r.get('crust'),
  Cell: scoreCell,
}, {
  id: 'tamano',
  Header: 'Tamaño',
  accessor: (r) => r.get('crumbSize'),
  Cell: scoreCell,
}, {
  id: 'color',
  Header: 'Color',
  accessor: (r) => r.get('crumbColor'),
  Cell: scoreCell,
}, {
  id: 'Consistencia',
  Header: 'Consistencia',
  accessor: (r) => r.get('crumbConsistency'),
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
    const scores = this.props.scores;
    return (
      <div className="card card-2 scoring-table">
        <div className="row">
          <div className="col-6 no-margin-i">
            <p className="card-title">Pan Blanco</p>
            <p className="small-text">Acapotzalco, CDMX</p>
          </div>
          <div className="col-6 no-margin-i float-right-i">
            <a
              className="float-right button grey-btn"
              href="/api/scores/download"
            >
              <Download />
            </a>
          </div>
        </div>
        <ReactTable
          className="center custom-table"
          data={scores && scores.toArray()}
          columns={columns}
          getTdProps={this.getTdProps}
          showPagination={false}
          showPageSizeOptions={false}
        />
      </div>
    )
  }
}
