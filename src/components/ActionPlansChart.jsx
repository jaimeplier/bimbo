import React, { Component } from 'react';
import Poly from './../utils/i18n';

export default class ActionPlansChart extends Component {
  render() {
    const metrics = this.props.metrics;
    return (
      <div className="card card-2 action-plans-chart">
        <p className="card-title">{Poly.t('KPIs')}</p>
        <div className="bar-content">
          <div className="row">
            <div className="col-12">
              <p>{Poly.t('Action Plans')}</p>
            </div>
            <div className="col-12">
            </div>
          </div>
          <div className="row bar-footer">
            <div className="col-4 center">
              <p className="bar-description">{Poly.t('Created')}</p>
              <p>{ metrics && metrics.get('created') }</p>
            </div>
            <div className="col-4 center">
              <p className="bar-description">{Poly.t('Completed')}</p>
              <p>{ metrics && metrics.get('completed') }</p>
            </div>
            <div className="col-4 center">
              <p className="bar-description">{Poly.t('Pending')}</p>
              <p>{ metrics && metrics.get('pending') }</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
