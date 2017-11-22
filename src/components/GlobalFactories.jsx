import React, { Component } from 'react';
import Poly from './../utils/i18n';
import { languageObject } from './../utils/i18n';
import ReactTable from 'react-table';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import CardHeader from './CardHeader';

import {
  TrendingUp,
  TrendingDown,
} from 'react-feather'

export default class GlobalFactories extends Component {
  constructor(props) {
    super(props)

    this.columns = [{
      Header: Poly.t('Factory'),
      id: 'factory',
      accessor: (r) => r.get('name'),
      Cell: this.factoryCell,
    }, {
      Header: Poly.t('Total Scores'),
      id: 'total scores',
      accessor: (r) => r.get('totalScores'),
      Cell: this.normalCell,
    }, {
      Header: Poly.t('Total Action Plans'),
      id: 'totalActionPlans',
      accessor: (r) => r.get('totalActionPlans'),
      Cell: this.normalCell,
    }, {
      Header: Poly.t('Average Score'),
      id: 'averageScore',
      accessor: (r) => r.get('averageScore'),
      Cell: this.normalCell,
    }, {
      Header: Poly.t('Diff. With Global Average'),
      id: 'diffWithAverage',
      accessor: (r) => r.get('diffWithAverage'),
      Cell: this.averageTableCell,
      sortMethod: this.diffWithAvgSort,
    }, {
      // TODO: Probably will need a custom sorting function for this
      Header: Poly.t('Last Activity'),
      id: 'lastActivty',
      accessor: (r) => r.get('lastActivity'),
      Cell: this.timeAgoCell.bind(this),
    }]

    this.timeAgoFormat = buildFormatter(languageObject.TimeAgoStrings)
  }

  diffWithAvgSort(a, b, desc) {
    const aIsNeg = (a.charAt(0) === '-')
    const bIsNeg = (b.charAt(0) === '-')
    if(aIsNeg && bIsNeg) {
      const aNum = parseInt(a.substring(1, a.length-1), 10);
      const bNum = parseInt(b.substring(1, b.length1), 10);
      return aNum < bNum ? 1 : -1;
    }
    if(aIsNeg && !bIsNeg) return -1;
    if(!aIsNeg && bIsNeg) return 1;
    const aNum = parseInt(a.substring(0, a.length-1), 10)
    const bNum = parseInt(b.substring(0, b.length-1), 10)
    return aNum > bNum ? 1 : -1;
  }

  timeAgoCell(row) {
    if(!row.value) return <p>{ Poly.t("No Activity") }</p>;
    return <p><TimeAgo
        date={row.value}
        formatter={this.timeAgoFormat}
      /></p>
  }

  normalCell(row) {
    return <p>{ row.value }</p>
  }

  factoryCell(row) {
    const country = row.original.get('country')
    return (
      <div className="factory-name">
        <div
          style={{backgroundImage: 'url("/country-flags/'+country+'.png")'}}
        />
        <p>{ row.value }</p>
      </div>
    )
  }

  averageTableCell(row) {
    var isPos = !(row.value.charAt(0) === '-')
    return (
      <p
        className={'avg-cell avg-cell-' + (isPos ? 'positive' : 'negative')}
      >
        { isPos ? <TrendingUp /> : <TrendingDown /> }
        { row.value }
      </p>
    )
  }

  render() {
    const factories = this.props.factories;
    return (
      <div className="card card-2 global-factories">
        <CardHeader
          title={Poly.t('Factories')}
        />
        <ReactTable
          className="center"
          data={factories && factories.toArray()}
          columns={this.columns}
          showPagination={false}
          pageSize={(factories && factories.size) || 20}
        />
      </div>
    )
  }
}
