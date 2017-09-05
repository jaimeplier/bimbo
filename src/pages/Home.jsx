import React, { Component } from 'react';

import ScoringTable from '../components/ScoringTable';
import ActionPlansInfo from '../components/ActionPlansInfo';

export default class Home extends Component {
  render() {
    return (
      <div>
        <ActionPlansInfo />
        <ScoringTable />
      </div>
    )
  }
}
