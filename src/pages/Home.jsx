import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import GlobalKPIs from '../components/GlobalKPIs';
import MonthlyLotsChart from '../components/MonthlyLotsChart';

import {
  getGlobalDashboardData,
} from '../actions/dashboardActions';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getGlobalDashboardData())
  }

  render() {
    const gbData = this.props.globalDashboard;

    return (
      <div>
        <Header />
        <GlobalKPIs 
          actionPlans={gbData && gbData.get('actionPlans')}
          scores={gbData && gbData.get('scores')}
        />
        <MonthlyLotsChart />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    globalDashboard: state.get('globalDashboard'),
  }
}

export default connect(mapStateToProps)(Home);
