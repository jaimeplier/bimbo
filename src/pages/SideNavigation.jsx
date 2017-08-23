import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Factory from './Factory';
import Home from './Home';

export default class SideNavigation extends Component {
  render() {
    return (
      <div>
        <Route path="/factory" component={Factory} />
        <Route exact path="/" component={Home} />
      </div>
    )
  }
}