/*global domtoimage*/

// TODO: Probably move the loadscript to utils
// the file name const at least because it's also
// being used on FactoryActionPlans.jsx
import React, { Component } from 'react';
import Poly from './../utils/i18n';
import loadScript from './../utils/loadScript.js';
import ReactTable from 'react-table';
import NProgress from 'nprogress';
import { ReactTableDefaults } from 'react-table';


import { timeCell, lotCell } from '../utils/customTableCells';

import CardHeader from './CardHeader';
import DownloadButtonDropdown from './DownloadButtonDropdown';

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
    super(props)
    this.handleDownload = this.handleDownload.bind(this)
  }

  tdStyle(state, rowInfo, column) {
    let style = '';
    const value = rowInfo && rowInfo.row && rowInfo.row[column.id];

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

  handleDownload(e, v) {
    if(v === 'png') return this.downloadPNG()
    const factorySlug = this.props.factorySlug
    window.location = "/api/factories/"+ factorySlug +"/scores/download/" + v
  }

  downloadPNG() {
    if(NProgress.status !== null) NProgress.done()
    if(typeof domtoimage === 'undefined')
      return this.loadPNGDownloadScript()
    var el = document.getElementsByClassName('rt-table')[0]
    var firstChildWidth = el.firstChild.style.minWidth
    el.style.minWidth = firstChildWidth;
    const fileName = 'scores-'+ Date.now() +'.png'
    domtoimage.toBlob(el)
      .then(blob => {
        el.style.minWidth = 'auto'
        window.saveAs(blob, fileName)
      })
  }

  loadPNGDownloadScript() {
    const script = '/lib-js/dom-to-image-filesaver.min.js'
    loadScript(script, this.downloadPNG)
  }

  render() {
    const scores = this.props.scores;
    return (
      <div className="card card-2 scoring-table">
        <CardHeader
          title={Poly.t('Lots')}
          noMargin={true}
          rightContent={
            <DownloadButtonDropdown
              handleDownload={this.handleDownload}
            />
          }
        />
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
