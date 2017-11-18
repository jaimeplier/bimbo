import React, { Component } from 'react';
import Poly from './../utils/i18n';
import Chart from 'chart.js';

import CardHeader from './CardHeader';

export default class MonthlyLotsChart extends Component {

  componentDidMount() {
    this.chartCtx = document.getElementById('monthly-lots-chart').getContext('2d');
    this.chart = new Chart(this.chartCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
          label: 'Poor',
          data: [30, 37, 35, 28, 10, 25, 5, 27, 1],
          backgroundColor: '#EF9696',
        }, {
          label: 'Actionable',
          data: [48, 40, 52, 43, 57, 43, 42, 47, 10],
          backgroundColor: '#F3E3A8',
        }, {
          label: 'Good',
          data: [115, 145, 103, 110, 148, 160, 145, 100, 30],
          backgroundColor: '#A4E8CB',
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }


  render() {
    return (
      <div className="card card-2 monthly-lots-chart">
        <CardHeader
          title={Poly.t('Monthly Lots')}
        />
        <canvas id="monthly-lots-chart" height="300"/>
      </div>
    )
  }
}
