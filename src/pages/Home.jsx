import React, { Component } from 'react';

import ScoringTable from '../components/ScoringTable';
import ActionPlansInfo from '../components/ActionPlansInfo';
import MonthlyLotsChart from '../components/MonthlyLotsChart';

export default class Home extends Component {
  render() {
    return (
      <div>
        <ActionPlansInfo />
        <MonthlyLotsChart />
        <ScoringTable />
      </div>
    )
  }
}
