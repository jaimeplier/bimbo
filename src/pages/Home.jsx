import React, { Component } from 'react';
import { connect } from 'react-redux';

import ActionPlansInfo from '../components/ActionPlansInfo';
import Header from '../components/Header';

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
        <ActionPlansInfo
          metrics={gbData && gbData.getIn(['actionPlans', 'metrics'])}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    globalDashboard: state.get('globalDashboard')
  }
}

export default connect(mapStateToProps)(Home);
