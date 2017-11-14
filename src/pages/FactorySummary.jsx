import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './../components/Header';
import MonthlyLotsChart from '../components/MonthlyLotsChart';
import ScoringTable from '../components/ScoringTable';
import ActionPlansChart from '../components/ActionPlansChart';

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
    return (
      <div className="factory-summary">
        <Header />
        <ActionPlansChart
          metrics={data && data.getIn(['actionPlans', 'metrics'])}
        />
        <MonthlyLotsChart />
        <ScoringTable
          scores={data && data.getIn(['scores', 'latestScores'])}
        />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const factory = ownProps.match.params.factory;
  return {
    summary: state.getIn(['factories', factory, 'summary']),
  }
}

export default connect(mapStateToProps)(FactorySummary)
