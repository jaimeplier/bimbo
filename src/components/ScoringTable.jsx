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
          id: 'Package Description',
          Header: this.headerCell('Package Description'),
          accessor: r => r.get('values').get('Package Description'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Weight',
          Header: this.headerCell('Weight'),
          accessor: r => r.get('values').get('Weight'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Tamano',
          Header: this.headerCell('Softness'),
          accessor: r => r.get('values').get('Softness'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Product Orientation/Shingling',
          Header: this.headerCell('Product Orientation/Shingling'),
          accessor: r => r.get('values').get('Product Orientation/Shingling'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Crust',
          Header: this.headerCell('Crust'),
          accessor: r => r.get('values').get('Crust'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Slicing',
          Header: this.headerCell('Slicing'),
          accessor: r => r.get('values').get('Slicing'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Height',
          Header: this.headerCell('Height'),
          accessor: r => r.get('values').get('Height'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Slope and Symmetry',
          Header: this.headerCell('Slope & Symmetry'),
          accessor: r => r.get('values').get('Slope & Symmetry'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Split',
          Header: this.headerCell('Split'),
          accessor: r => r.get('values').get('Split'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Grain',
          Header: this.headerCell('Grain'),
          accessor: r => r.get('values').get('Grain'),
          Cell: row => this.nestedCell(row.value),
        }, {
          id: 'Flavor and Aroma',
          Header: this.headerCell('Flavor & Aroma'),
          accessor: r => r.get('values').get('Flavor & Aroma'),
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
