import React, { Component } from 'react';
import Poly from './../utils/i18n';
import { connect } from 'react-redux';

import Header from './../components/Header';
import MonthlyLotsChart from '../components/MonthlyLotsChart';
import ScoringTable from '../components/ScoringTable';
import ActionPlansChart from '../components/ActionPlansChart';
import CardHeader from '../components/CardHeader';

import {
  getFactorySummary,
} from '../actions/factoryActions'

class FactorySummary extends Component {

  componentWillMount() {
    const factorySlug = this.props.match.params.factory;
    this.props.dispatch(getFactorySummary(factorySlug))
  }

  render() {
    const data = this.props.summary;
    const factorySlug = this.props.match.params.factory;
    const info = this.props.factoryInfo;
    return (
      <div className="factory-summary">
        <Header
          crumb={[{
            name: (info && info.get('name')),
            to: '/factory/'+factorySlug,
          }]}
        />
        <CardHeader
          title={Poly.t('summary')}
        />
        <ActionPlansChart
          metrics={data && data.getIn(['actionPlans', 'metrics'])}
        />
        <MonthlyLotsChart />
        <ScoringTable
          scores={data && data.getIn(['scores', 'latestScores'])}
          factorySlug={factorySlug}
        />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const factory = ownProps.match.params.factory;
  return {
    summary: state.getIn(['factories', factory, 'summary']),
    factoryInfo: state.getIn(['factories', factory, 'info']),
  }
}

export default connect(mapStateToProps)(FactorySummary)
