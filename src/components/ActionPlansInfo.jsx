import React, { Component } from 'react';

export default class ActionPlansInfo extends Component {
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
              <p>5</p>
            </div>
            <div className="col-4 center">
              <p className="bar-description">COMPLETED</p>
              <p>4</p>
            </div>
            <div className="col-4 center">
              <p className="bar-description">PENDING</p>
              <p>1</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
