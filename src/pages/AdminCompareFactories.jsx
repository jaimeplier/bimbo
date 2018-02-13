import React, { Component } from 'react';
import { connect } from 'react-redux';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import Poly from './../utils/i18n';
import FilterHeader from '../components/FilterHeader';
import Header from '../components/Header';

import {
  getFactories,
} from './../actions/dashboardActions';

import {
  getCompareData,
} from './../actions/compareActions';

class AdminCompareFactories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organizationValue: 'todos',
      productValue: 'todos',
      timeValue: 'last-24',

      factoryFirst: 'azcapotzalco',
      factorySecond: 'puebla',

      columns: [{
        Header: 'Averages',
        id: 'factory',
        className: 'left',
      }, {
        Header: 'Azcapotzalco',
        id: 'factoryFirst',
        className: 'left',
      }, {
        Header: 'Puebla',
        id: 'factorySecond',
      }, {
        Header: 'Global Average',
        id: 'averageScore',
      }],
    };
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentWillMount() {
    if (!this.props.adminFactories) {
      this.props.dispatch(getFactories());
    }
    this.loadCompareData();
  }

  loadCompareData() {
    this.props.dispatch(getCompareData(this.state.factoryFirst, this.state.factorySecond));
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

  handleFirstFactoryChange = (event, index, value) => this.setState(
    { factoryFirst: value },
    this.changeFactories,
  );

  handleSecondFactoryChange = (event, index, value) => this.setState(
    { factorySecond: value },
    this.changeFactories,
  );

  changeFactories() {
    this.setState({
      columns: [{
        Header: 'Averages',
        id: 'factory',
        className: 'left',
      }, {
        Header: this.state.factoryFirst,
        id: 'factoryFirst',
        className: 'left',
      }, {
        Header: this.state.factorySecond,
        id: 'factorySecond',
      }, {
        Header: 'Global Average',
        id: 'averageScore',
      }],
    }, this.loadCompareData());
  }

  render() {
    const factories = this.props.adminFactories;
    const data = this.props.compareData;

    return (
      <div className="factories-compare">
        <Header
          crumb={[{ name: Poly.t('Compare'), to: '/compare' }]}
        />
        <FilterHeader
          title="Compare"
          organizations={this.props.organizations}
          products={this.props.currentProducts}
          organizationValue={this.state.organizationValue}
          handleOrganizationChange={this.handleOrganizationChange}
          productValue={this.state.productValue}
          handleProductChange={this.handleProductChange}
          timeValue={this.state.timeValue}
          handleTimeChange={this.handleTimeChange}
        />
        <div className="card card-2">
          <DropDownMenu
            value={this.state.factoryFirst}
            onChange={this.handleFirstFactoryChange}
          >
            { factories && factories.map(item =>
              <MenuItem value={item.get('slug')} key={item.get('id')} primaryText={item.get('name')} />)}
          </DropDownMenu>
          <DropDownMenu
            value={this.state.factorySecond}
            onChange={this.handleSecondFactoryChange}
          >
            { factories && factories.map(item =>
              <MenuItem value={item.get('slug')} key={item.get('id')} primaryText={item.get('name')} />)}
          </DropDownMenu>
        </div>
        <div className="card card-2">
          <div className="compare-chart">
            <div className="compare-row">
              <div className="compare-column">
                Averages
              </div>
              <div className="compare-column">
                { this.state.factoryFirst }
              </div>
              <div className="compare-column">
                { this.state.factorySecond }
              </div>
              <div className="compare-column">
                Global Average
              </div>
            </div>
            { data && data.get('allAttributes').map(item => (
              <div className="compare-row">
                <div className="compare-column">
                  { item }
                </div>
                <div className="compare-column">
                  { data.get('averageAttributes1').get(item) && (data.get('averageAttributes1').get(item).get('failure') - parseFloat(data.get('averageAttributes1').get(item).get('average'))) }
                </div>
                <div className="compare-column">
                  { data.get('averageAttributes2').get(item) && (data.get('averageAttributes2').get(item).get('failure') - parseFloat(data.get('averageAttributes2').get(item).get('average'))) }
                </div>
                <div className="compare-column">
                  { data.get('globalAttributes').get(item) && (data.get('globalAttributes').get(item).get('failure') - parseFloat(data.get('globalAttributes').get(item).get('average'))) }
                </div>
              </div>
              ))}
            <div className="compare-row">
              <div className="compare-column">
                Total:
              </div>
              <div className="compare-column">
                { data && data.get('averageScore1').toArray()[0].get('averageScore') }
              </div>
              <div className="compare-column">
                { data && data.get('averageScore2').toArray()[0].get('averageScore') }
              </div>
              <div className="compare-column">
                { data && data.get('globalAverage').toArray()[0].get('averageScore') }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    organizations: state.get('organizations'),
    currentProducts: state.get('currentProducts'),
    adminFactories: state.get('adminFactories'),
    compareData: state.get('compareData'),
  };
}

export default connect(mapStateToProps)(AdminCompareFactories);
