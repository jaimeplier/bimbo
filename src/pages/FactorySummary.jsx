import React, { Component } from 'react';
import { connect } from 'react-redux';

import Poly from './../utils/i18n';

import Header from './../components/Header';
import MonthlyLotsChart from '../components/MonthlyLotsChart';
import ActionPlansChart from '../components/ActionPlansChart';
import CardHeader from '../components/CardHeader';

import { getFactorySummary } from '../actions/factoryActions';

class FactorySummary extends Component {
  componentWillMount() {
    const factorySlug = this.props.match.params.factory;
    this.props.dispatch(getFactorySummary(factorySlug));
  }

  render() {
    const data = this.props.summary;
    const { factory: factorySlug } = this.props.match.params;
    const { factoryInfo } = this.props;
    return (
      <div className="factory-summary">
        <Header
          crumb={[{
            name: (factoryInfo && factoryInfo.get('name')),
            to: `/factory/${factorySlug}`,
          }]}
        />
        <div className="card card-2 card-header">
          <CardHeader
            title={Poly.t('Summary')}
            subtitle={factoryInfo && factoryInfo.get('address')}
          />
        </div>
        <ActionPlansChart
          metrics={data && data.getIn(['actionPlans', 'metrics'])}
        />
        <MonthlyLotsChart />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { factory } = ownProps.match.params;
  return {
    summary: state.getIn(['factories', factory, 'summary']),
    factoryInfo: state.getIn(['factories', factory, 'info']),
  };
}

export default connect(mapStateToProps)(FactorySummary);
