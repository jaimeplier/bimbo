import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import Poly from './../utils/i18n';

import Header from './../components/Header';
import CardHeader from '../components/CardHeader';
import ScoringTable from '../components/ScoringTable';
import LotCards from '../components/LotCards';

import {
  getFactorySummary,
  getFactoryScores,
} from '../actions/factoryActions';

class FactoryLots extends Component {
  constructor(props) {
    super(props);

    this.state = { generalView: true };

    this.fetchScoreData = this.fetchScoreData.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  componentWillMount() {
    const factorySlug = this.props.match.params.factory;
    this.props.dispatch(getFactorySummary(factorySlug));
  }

  toggleView() {
    this.setState(prevState => ({ generalView: !prevState.generalView }));
  }

  fetchScoreData(state) {
    const factorySlug = this.props.match.params.factory;
    this.props.dispatch(getFactoryScores(factorySlug, state.page, state.pageSize));
  }

  render() {
    const { factoryInfo } = this.props;
    const { scores } = this.props;
    const { factory: factorySlug } = this.props.match.params;

    const { generalView } = this.state;

    let lotsView = null;
    if (generalView) {
      lotsView = (<ScoringTable
        scores={scores}
        onFetchData={this.fetchScoreData}
        factorySlug={factorySlug}
      />);
    } else {
      lotsView = (<LotCards
        scores={scores}
        onFetchData={this.fetchScoreData}
        factorySlug={factorySlug}
      />);
    }

    return (
      <div className="factory-summary">
        <Header
          crumb={[{
                name: (factoryInfo && factoryInfo.get('name')),
                to: `/factory/${factorySlug}`,
            }, {
                name: Poly.t('Lots'),
                to: `/factory/${factorySlug}/lots`,
            }]}
        />
        <div className="card card-2 card-header">
          <CardHeader
            title={Poly.t('Summary')}
            subtitle={factoryInfo && factoryInfo.get('address')}
            rightContent={
              <div>
                <RaisedButton
                  label={Poly.t('Toggle View')}
                  primary
                  onClick={this.toggleView}
                />
              </div>
            }
          />
        </div>
        {lotsView}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { factory } = ownProps.match.params;
  return {
    factoryInfo: state.getIn(['factories', factory, 'info']),
    scores: state.getIn(['factories', factory, 'scores']),
  };
}

export default connect(mapStateToProps)(FactoryLots);
