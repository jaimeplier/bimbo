import React, { Component } from 'react';
import { sendGetRequest } from './../utils/customRequests';

export default class ActionPlansInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    sendGetRequest('/api/action-plans/kpis', (d) => {
      this.setState(d);
    }, null, true);
  }
  
  render() {
    return (
      <div className="card card-2 action-plans-info">
        <p className="card-title">KPI's</p>
        <div className="bar-content">
          <div className="row">
            <div className="col-12">
              <p>Action Plans</p>
            </div>
          </div>
          <div className="row bar-footer">
            <div className="col-4 center">
              <p className="bar-description">CREATED</p>
              <p>{ this.state.created }</p>
            </div>
            <div className="col-4 center">
              <p className="bar-description">COMPLETED</p>
              <p>{ this.state.completed }</p>
            </div>
            <div className="col-4 center">
              <p className="bar-description">PENDING</p>
              <p>{ this.state.pending }</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
