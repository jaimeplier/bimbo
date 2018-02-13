/* global domtoimage */

// TODO: Probably move the loadscript to utils
// the file name const at least because it's also
// being used on FactoryActionPlans.jsx
import React, { Component } from 'react';
import NProgress from 'nprogress';
import ReactTable, { ReactTableDefaults } from 'react-table';
import RaisedButton from 'material-ui/RaisedButton';

import Poly from './../utils/i18n';
import loadScript from './../utils/loadScript';
import { timeCell, lotCell } from '../utils/customTableCells';

import CardHeader from './CardHeader';
import DownloadButtonDropdown from './DownloadButtonDropdown';


export default class ScoringTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: -1,
      tableCollapsed: false,
      columnMinWidth: 0.1,
      columns: [],
    };

    this.headerCell = this.headerCell.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.fetchData = this.fetchData.bind(this);

    Object.assign(ReactTableDefaults.column, {
      minWidth: 200,
    });
  }
  getTdProps(state, rowInfo, column) {
    let color = '';
    const value = rowInfo && rowInfo.row && rowInfo.row[column.id];

    if (value === 'Success') color = 'rgba(38, 194, 129, 0.22)';
    if (value === 'Warning') color = 'rgba(247, 202, 23, 0.22)';
    if (value === 'Failure') color = 'rgba(247, 23, 23, 0.22)';

    return { style: { backgroundColor: color } };
  }

  tdStyle(state, rowInfo, column) {
    let style = '';
    const value = rowInfo && rowInfo.row && rowInfo.row[column.id];

    switch (value) {
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

    return { className: style };
  }


  scoreCell() {
    return (
      <div />
    );
  }

  nestedCell(row) {
    let style = '';
    if (row !== undefined) {
      switch (row.get('value')) {
        case row.get('successCase'):
          style = 'success';
          break;
        case row.get('warningCase'):
          style = 'warning';
          break;
        case row.get('failureCase'):
          style = 'failure';
          break;
        default:
      }
    }
    return (
      <div className={style} />
    );
  }

  headerCell(name) {
    let title = name;
    if (!this.state || this.state.tableCollapsed) {
      title = name.match(/\b(\w)/g);
    }

    return (
      <div>
        { title }
      </div>
    );
  }

  handleDownload(e, v) {
    if (v === 'png') return this.downloadPNG();
    const { factorySlug } = this.props;
    window.location = `/api/factories/${factorySlug}/scores/download/${v}`;
  }

  downloadPNG() {
    if (NProgress.status !== null) NProgress.done();
    if (typeof domtoimage === 'undefined') {
      return this.loadPNGDownloadScript();
    }
    const el = document.getElementsByClassName('rt-table')[0];
    const firstChildWidth = el.firstChild.style.minWidth;
    el.style.minWidth = firstChildWidth;
    const fileName = `scores-${Date.now()}.png`;
    domtoimage.toBlob(el)
      .then((blob) => {
        el.style.minWidth = 'auto';
        window.saveAs(blob, fileName);
      });
  }

  loadPNGDownloadScript() {
    const script = '/lib-js/dom-to-image-filesaver.min.js';
    loadScript(script, this.downloadPNG);
  }

  toggleView() {
    this.setState(
      (prevState) => {
        if (prevState.tableCollapsed) {
          return {
            columnMinWidth: 200,
            tableCollapsed: false,
          };
        }
        return {
          columnMinWidth: 0.1,
          tableCollapsed: true,
        };
      },

      () => this.setState({
        columns: [{
          Header: 'Fecha',
          id: 'createdAt',
          accessor: r => r.get('createdAt'),
          Cell: timeCell,
          minWidth: 140,
          maxWidth: 140,
        }, {
          Header: 'No. Lote',
          id: 'lot',
          accessor: r => r.get('lot'),
          Cell: lotCell,
          minWidth: 140,
          maxWidth: 140,
        }, {
          Header: 'Producto',
          id: 'product',
          accessor: r => r.get('productName'),
          minWidth: 140,
          maxWidth: 140,
        }, {
          id: 'hermeticidad',
          Header: this.headerCell('Hermeticidad'),
          accessor: r => r.get('values').get('airTightness'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Caracteristicas Fisicas',
          Header: this.headerCell('Caracteristicas Fisicas'),
          accessor: r => r.get('values').get('packaging'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Tamano',
          Header: this.headerCell('Tamaño'),
          accessor: r => r.get('values').get('size'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Limpieza',
          Header: this.headerCell('Limpieza'),
          accessor: r => r.get('values').get('cleanliness'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Promociones',
          Header: this.headerCell('Promociones'),
          accessor: r => r.get('values').get('promotions'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Condiciones Fisicas',
          Header: this.headerCell('Condiciones Fisicas'),
          accessor: r => r.get('values').get('product'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Color del Empaque',
          Header: this.headerCell('Color del Empaque'),
          accessor: r => r.get('values').get('color'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Olor',
          Header: this.headerCell('Olor'),
          accessor: r => r.get('values').get('scent'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Sabor',
          Header: this.headerCell('Sabor'),
          accessor: r => r.get('values').get('taste'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Comestiblidad / Textura',
          Header: this.headerCell('Comestibilidad / Textura'),
          accessor: r => r.get('values').get('edibility'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Inocuidad',
          Header: this.headerCell('Inocuidad'),
          accessor: r => r.get('values').get('harmlessness'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Peso',
          Header: this.headerCell('Peso'),
          accessor: r => r.get('values').get('weight'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Simetria',
          Header: this.headerCell('Simetría'),
          accessor: r => r.get('values').get('symmetry'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Numero de rebanadas',
          Header: this.headerCell('Numero de rebanadas'),
          accessor: r => r.get('values').get('slicing'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'corteza / pizo',
          Header: this.headerCell('Corteza / Pizo'),
          accessor: r => r.get('values').get('crust'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'tamano',
          Header: this.headerCell('Tamaño'),
          accessor: r => r.get('values').get('crumbSize'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'color',
          Header: this.headerCell('Color'),
          accessor: r => r.get('values').get('crumbColor'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Consistencia',
          Header: this.headerCell('Consistencia'),
          accessor: r => r.get('values').get('crumbConsistency'),
          Cell: row => this.nestedCell(row.value),
        }],
      }),
    );
  }

  fetchData(state) {
    this.props.onFetchData(state);
    this.toggleView();
  }

  render() {
    const { scores } = this.props;
    return (
      <div className="card card-2 scoring-table">
        <CardHeader
          title={Poly.t('Lots')}
          noMargin
          rightContent={
            <div>
              <DownloadButtonDropdown
                handleDownload={this.handleDownload}
              />
              <RaisedButton
                label={Poly.t('Toggle View')}
                primary
                onClick={this.toggleView}
              />
            </div>
          }
        />
        <ReactTable
          className="center custom-table"
          data={scores && scores.get('scores').toArray()}
          pages={scores && scores.get('pageCount')}
          columns={this.state.columns}
          column={
            {
              ...ReactTableDefaults.column,
              minWidth: this.state.columnMinWidth,
            }
          }
          manual
          defaultPageSize={5}
          getTdProps={this.getTdProps}
          onFetchData={this.fetchData}
        />
      </div>
    );
  }
}
