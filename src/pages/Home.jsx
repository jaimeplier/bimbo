import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import GlobalKPIs from '../components/GlobalKPIs';
import MonthlyLotsChart from '../components/MonthlyLotsChart';
import GlobalFactories from '../components/GlobalFactories';
import GlobalFactoriesMap from '../components/GlobalFactoriesMap';
import FilterHeader from '../components/FilterHeader';

import {
  getGlobalDashboardData,
  getOrganizations,
  getProductsByOrganization,
} from '../actions/dashboardActions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationValue: 'todos',
      productValue: 'todos',
      timeValue: 'last-24',
    };
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getGlobalDashboardData());
    this.props.dispatch(getOrganizations());
    this.props.dispatch(getProductsByOrganization(this.getQueryVariable('organization')));

    if (this.getQueryVariable('organization')) {
      this.setState({ organizationValue: this.getQueryVariable('organization') });
    }
    if (this.getQueryVariable('product')) {
      this.setState({ productValue: this.getQueryVariable('product') });
    }
    if (this.getQueryVariable('time')) {
      this.setState({ timeValue: this.getQueryVariable('time') });
    }
  }

  getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i += 1) {
      const pair = vars[i].split('=');
      if (pair[0] === variable) { return String(pair[1], 10); }
    }
    return (false);
  }

  handleOrganizationChange = (event, index, value) => {
    this.setState({ organizationValue: value, productValue: 'todos' }, () => this.changeURL());
  };

  handleProductChange = (event, index, value) => {
    this.setState({ productValue: value }, () => this.changeURL());
  };

  handleTimeChange = (event, index, value) => {
    this.setState({ timeValue: value }, () => this.changeURL());
  };

  changeURL() {
    window.location.href = `?organization=${this.state.organizationValue}&product=${this.state.productValue}&time=${this.state.timeValue}`;
  }

  render() {
    const gbData = this.props.globalDashboard;

    return (
      <div>
        <Header />
        <FilterHeader
          title="Home"
          organizations={this.props.organizations}
          products={this.props.currentProducts}
          organizationValue={this.state.organizationValue}
          handleOrganizationChange={this.handleOrganizationChange}
          productValue={this.state.productValue}
          handleProductChange={this.handleProductChange}
          timeValue={this.state.timeValue}
          handleTimeChange={this.handleTimeChange}
        />
        <GlobalKPIs
          actionPlans={gbData && gbData.get('actionPlans')}
          scores={gbData && gbData.get('scores')}
        />
        <MonthlyLotsChart />
        <GlobalFactoriesMap
          mapData={gbData && gbData.get('factoriesMap')}
        />
        <GlobalFactories
          factories={gbData && gbData.get('factories')}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    globalDashboard: state.get('globalDashboard'),
    organizations: state.get('organizations'),
    currentProducts: state.get('currentProducts'),
  };
}

export default connect(mapStateToProps)(Home);
