/* global google */
import React, { Component } from 'react';
import Poly from './../utils/i18n';

import loadScript from './../utils/loadScript';
import CardHeader from './CardHeader';

const GoogleChartsScript = 'https://www.gstatic.com/charts/loader.js';
const GoogleMapsKey = 'AIzaSyCkzL5VX0uq4gciSN7xh7l9BubCbwq_hUk';

export default class GlobalFactoriesMap extends Component {
  constructor(props) {
    super(props);
    this.mapLoaded = this.mapLoaded.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.chartsLoaded = this.chartsLoaded.bind(this);
  }
  componentWillMount() {
    if (this.isGoogleVisualizationLoaded()) return true;
    loadScript(GoogleChartsScript, this.chartsLoaded);
  }


  componentDidMount() {
    if (this.isGoogleVisualizationLoaded()) return this.mapLoaded();
  }

  componentDidUpdate(prevProps) {
    // Don't rerender if props don't change
    if (!prevProps.mapData) return;
    if (prevProps.mapData.equals(this.props.mapData)) return;
    if (this.isGoogleVisualizationLoaded()) return this.updateMap();
  }

  isGoogleVisualizationLoaded() {
    return !(
      (typeof google === 'undefined') ||
      (typeof google.visualization === 'undefined')
    );
  }

  chartsLoaded() {
    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: GoogleMapsKey,
      callback: this.mapLoaded,
    });
  }

  mapLoaded() {
    this.chart = new google.visualization.GeoChart(document.getElementById('global-factories-map'));
    this.updateMap();
  }

  updateMap() {
    const options = {
      colorAxis: { colors: ['#B8E3F1', '#0091B2'] },
    };
    const data = google.visualization.arrayToDataTable(this.props.mapData.toJS());
    this.chart.draw(data, options);
  }

  render() {
    return (
      <div className="card card-2">
        <CardHeader
          title={Poly.t('Global Map')}
        />
        <div
          id="global-factories-map"
          style={{ minHeight: 610 }}
        />
      </div>
    );
  }
}
