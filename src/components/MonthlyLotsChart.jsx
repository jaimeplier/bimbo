import React, { Component } from 'react';
import Chart from 'chart.js';
import Poly from './../utils/i18n';

import CardHeader from './CardHeader';

export default class MonthlyLotsChart extends Component {
  componentDidMount() {
    this.chartCtx = document.getElementById('monthly-lots-chart').getContext('2d');
    this.chart = new Chart(this.chartCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Poor',
          data: [30, 37, 35, 28, 10, 25, 5, 27, 20, 22, 14, 18],
          backgroundColor: 'rgba(242, 130, 130, 0.65)',
          borderColor: 'rgb(242, 130, 130)',
          borderWidth: '1',
        }, {
          label: 'Actionable',
          data: [48, 40, 52, 43, 57, 43, 42, 47, 53, 41, 38, 60],
          backgroundColor: 'rgba(229, 193, 55, 0.4)',
          borderColor: 'rgb(229, 193, 55)',
          borderWidth: '1',
        }, {
          label: 'Good',
          data: [115, 145, 103, 110, 148, 160, 145, 100, 130, 120, 112, 114],
          backgroundColor: 'rgba(159, 243, 208, 0.7)',
          borderColor: 'rgb(159, 243, 208)',
          borderWidth: '1',
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 250,
            },
          }],
          xAxes: [{
            barPercentage: 1,
            categoryPercentage: 0.6,
          }],
        },
      },
    });
  }


  render() {
    return (
      <div className="card card-2 monthly-lots-chart">
        <CardHeader
          title={Poly.t('Monthly Lots')}
        />
        <canvas id="monthly-lots-chart" height="350" />
      </div>
    );
  }
}
