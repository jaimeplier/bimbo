import React, { Component } from 'react';

import ActionPlansChart from './ActionPlansChart';

export default class ActionPlansInfo extends Component {
  render() {
    const metrics = this.props.metrics;
    return (
      <div className="card card-2 action-plans-info">
        <p className="card-title">KPI's</p>
        <div className="bar-content">
          <div className="row">
            <div className="col-12">
              <p>Action Plans</p>
            </div>
            <div className="col-12">
              <ActionPlansChart />
            </div>
          </div>
          <div className="row bar-footer">
            <div className="col-4 center">
              <p className="bar-description">CREATED</p>
              <p>{ metrics && metrics.get('created') }</p>
            </div>
            <div className="col-4 center">
              <p className="bar-description">COMPLETED</p>
              <p>{ metrics && metrics.get('completed') }</p>
            </div>
            <div className="col-4 center">
              <p className="bar-description">PENDING</p>
              <p>{ metrics && metrics.get('pending') }</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
