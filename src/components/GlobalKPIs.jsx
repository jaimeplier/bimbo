import React, { Component } from 'react';
import Poly from './../utils/i18n';

import CardHeader from './CardHeader';
import ActionPlansInfo from './ActionPlansInfo';

import {
  ThumbsUp,
  AlertTriangle,
} from 'react-feather';

export default class GlobalKPIs extends Component {
  render() {
    const actionPlans = this.props.actionPlans;
    const scores = this.props.scores;
    return (
      <div className="card card-2 global-kpis">
        <CardHeader
          title={Poly.t("KPIs")}
        />
        <div className="row">
          <div className="left-content">
            <ActionPlansInfo
              metrics={actionPlans && actionPlans.get('metrics')}
            />
          </div>
          <div className="right-content">
            <div className="row">
              <div className="score-totals success-totals">
                <ThumbsUp />
                <div className="score-text score-text-right">
                  <p>{ Poly.t("Successful Lots") }</p>
                  <p>{ scores && scores.get('successful') }</p>
                </div>
              </div>
              <div className="score-totals unsuccess-totals">
                <div className="score-text score-text-left">
                  <p>{ Poly.t("Unsuccessful Lots") }</p>
                  <p>{ scores && scores.get('unsuccessful') }</p>
                </div>
                <AlertTriangle style={{float:'right'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
