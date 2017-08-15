import React, { Component } from 'react';
import { sendGetRequest } from '../utils/customRequests';
import ReactTable from 'react-table';
import { ReactTableDefaults } from 'react-table';

const columns = [{
  Header: 'Time',
  accessor: 'created_at',
}, {
  Header: 'Lot #',
  accessor: 'result.batchNumber',
}, {
  id: 'hermeticidad',
  Header: 'Hermeticidad',
  accessor: e => e.result.attributes[0].score,
}, {
  id: 'Caracteristicas Fisicas',
  Header: 'Caracteristicas Fisicas',
  accessor: e => e.result.attributes[1].score,
}, {
  id: 'Tamano',
  Header: 'Tamaño',
  accessor: e => e.result.attributes[2].score,
}, {
  id: 'Limpieza',
  Header: 'Limpieza',
  accessor: e => e.result.attributes[3].score,
}, {
  id: 'Promociones',
  Header: 'Promociones',
  accessor: e => e.result.attributes[4].score,
}, {
  id: 'Condiciones Fisicas',
  Header: 'Condiciones Fisicas',
  accessor: e => e.result.attributes[5].score,
}, {
  id: 'Color del Empaque',
  Header: 'Color del Empaque',
  accessor: e => e.result.attributes[6].score,
}, {
  id: 'Olor',
  Header: 'Olor',
  accessor: e => e.result.attributes[7].score,
}, {
  id: 'Sabor',
  Header: 'Sabor',
  accessor: e => e.result.attributes[8].score,
}, {
  id: 'Comestiblidad / Textura',
  Header: 'Comestiblidad / Textura',
  accessor: e => e.result.attributes[9].score,
}, {
  id: 'Inocuidad',
  Header: 'Inocuidad',
  accessor: e => e.result.attributes[10].score,
}, {
  id: 'Peso',
  Header: 'Peso',
  accessor: e => e.result.attributes[11].score,
}, {
  id: 'Simetria',
  Header: 'Simetría',
  accessor: e => e.result.attributes[12].score,
}, {
  id: 'Numero de rebanadas',
  Header: 'Numero de rebanadas',
  accessor: e => e.result.attributes[13].score,
}, {
  id: 'corteza / pizo',
  Header: 'Corteza / Pizo',
  accessor: e => e.result.attributes[14].score,
}, {
  id: 'tamano',
  Header: 'Tamaño',
  accessor: e => e.result.attributes[15].score,
}, {
  id: 'color',
  Header: 'Color',
  accessor: e => e.result.attributes[16].score,
}, {
  id: 'Consistencia',
  Header: 'Consistencia',
  accessor: e => e.result.attributes[17].score,
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

  render() {
    return (
      <div className="card card-2">
        <p className="card-title">Pan Blanco</p>
        <p className="small-text">Acapotzalco, CDMX</p>
        <ReactTable
          className="center"
          data={this.state.tableData}
          columns={columns}
          showPagination={false}
          showPageSizeOptions={false}
        />
      </div>
    )
  }
}


