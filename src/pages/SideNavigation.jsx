import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Factory from './Factory';
import Home from './Home';

export default class SideNavigation extends Component {
  render() {
    return (
      <div>
        <div id="sidenav" className="card-2">
          <div className="user-info">
          </div>
          <div className="link">
            <p>Home</p>
          </div>
          <div className="link">
            <p>Action Plans</p>
          </div>
        </div>
        <div id="main">
          <Route path="/factory" component={Factory} />
          <Route exact path="/" component={Home} />
        </div>
      </div>
    )
  }
}
