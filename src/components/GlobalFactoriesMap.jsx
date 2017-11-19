/*global google*/

import React, { Component } from 'react';
import Poly from './../utils/i18n';

import CardHeader from './CardHeader';

const GoogleChartsScript = 'https://www.gstatic.com/charts/loader.js'
const GoogleMapsKey = 'AIzaSyCkzL5VX0uq4gciSN7xh7l9BubCbwq_hUk'

export default class GlobalFactoriesMap extends Component {
  constructor(props) {
    super(props)
    this.mapLoaded = this.mapLoaded.bind(this)
    this.updateMap = this.updateMap.bind(this)
  }
  componentWillMount() {
    if(this.isGoogleVisualizationLoaded()) return true;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = GoogleChartsScript;
    var head = document.head||document.getElementsByTagName("head")[0];
    head.appendChild(s)
    s.onload = this.chartsLoaded.bind(this);
  }


  componentDidMount() {
    if(this.isGoogleVisualizationLoaded()) return this.mapLoaded()
  }

  isGoogleVisualizationLoaded() {
    return !(
      (typeof google === 'undefined') ||
      (typeof google.visualization === 'undefined')
    )
  }

  chartsLoaded() {
    google.charts.load('current', {
      'packages':['geochart'],
      'mapsApiKey': GoogleMapsKey,
      'callback': this.mapLoaded,
    })
  }

  componentDidUpdate(prevProps) {
    // Don't rerender if props don't change
    if(!prevProps.mapData) return;
    if(prevProps.mapData.equals(this.props.mapData)) return;
    if(this.isGoogleVisualizationLoaded()) return this.updateMap()
  }

  mapLoaded() {
    this.chart = new google.visualization.GeoChart(
      document.getElementById('global-factories-map')
    )
    this.updateMap()
  }

  updateMap() {
    const options = {
      colorAxis: {colors: ['#efe6dc', '#0091B2']},
      // backgroundColor: '#fbfbfb',
    }
    var data = google.visualization.arrayToDataTable(
      this.props.mapData.toJS()
    )
    this.chart.draw(data, options);
  }

  render() {
    return (
      <div className="card card-2">
        <CardHeader
          title={ Poly.t('Global Map') }
        />
        <div
          id="global-factories-map"
          style={{minHeight: 610}}
        />
      </div>
    )
  }
}
