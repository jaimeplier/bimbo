import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './../components/Header';
import MonthlyLotsChart from '../components/MonthlyLotsChart';
import ScoringTable from '../components/ScoringTable';

class FactorySummary extends Component {
  render() {
    return (
      <div className="factory-summary">
        <Header />
        <MonthlyLotsChart />
        <ScoringTable />
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(FactorySummary)
