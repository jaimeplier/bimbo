import React, { Component } from 'react';
import Poly from './../utils/i18n';
import Chart from 'chart.js';

import CardHeader from './CardHeader';

export default class ActionPlansChart extends Component {
  componentDidMount() {
    this.chartCtx = document.getElementById('action-plans-chart').getContext('2d');
    this.chart = new Chart(this.chartCtx, {
      type: 'line',
      data: {
          labels: ["Mon", "Thu", "Wed", "Thu", "Fri", "Sat"],
          datasets: [{
              label: 'Completed',
              data: [10, 10, 3, 4, 2, 1],
              backgroundColor: 'rgba(46, 144, 0, 1)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1
          }, {
              label: 'Total',
              data: [12, 19, 3, 5, 2, 2],
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderColor: 'rgba(20, 196, 17, 1)',
              borderWidth: 1
          }]
      },
      options: {
          fontColor: '#ffffff',
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    })
  }

  render() {
    const metrics = this.props.metrics;
    return (
      <div className="card card-2 action-plans-chart">
        <CardHeader
          title={Poly.t('KPIs')}
        />
        <div className="bar-content">
          <div className="row">
            <div className="col-12">
              <p>{Poly.t('Action Plans')}</p>
            </div>
            <div className="col-12">
              <canvas id="action-plans-chart" height="100" />
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
