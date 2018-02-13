import React, { Component } from 'react';
import Poly from './../utils/i18n';

export default class ActionPlansInfo extends Component {
  render() {
    const { metrics } = this.props;
    return (
      <div className="action-plans-info">
        <div className="title">
          <p>{ Poly.t('Action Plans') }</p>
        </div>
        <div className="main-content">
          <div className="action-plan">
            <p>{ Poly.t('Created') }</p>
            <p className="f-right">{ metrics && metrics.get('created') }</p>
          </div>
          <div className="action-plan border-line">
            <p>{ Poly.t('Completed') }</p>
            <p className="f-right">{ metrics && metrics.get('completed') }</p>
          </div>
          <div className="action-plan">
            <p>{ Poly.t('Pending') }</p>
            <p className="f-right">{ metrics && metrics.get('pending') }</p>
          </div>
        </div>
      </div>
    );
  }
}
