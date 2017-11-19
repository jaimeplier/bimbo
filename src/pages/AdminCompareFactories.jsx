import React, { Component } from 'react';
import Poly from './../utils/i18n';

import Header from '../components/Header';

export default class AdminCompareFactories extends Component {
  render() {
    return (
      <div>
        <Header
          crumb={[{name: Poly.t('Compare'), to: '/compare'}]}
        />
      </div>
    )
  }
}
