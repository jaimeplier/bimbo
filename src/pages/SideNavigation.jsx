import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import {
  Home as HomeIcon,
  CheckCircle
} from 'react-feather';

import Factory from './Factory';
import Home from './Home';

export default class SideNavigation extends Component {
  render() {
    return (
      <div>
        <div id="sidenav" className="card-2">
          <div className="user-info">
          </div>
          <NavLink to="/" activeClassName="link-active" exact={true}>
            <div className="link">
              <HomeIcon />
              <p>Home</p>
            </div>
          </NavLink>
          <NavLink to="/action-plans" activeClassName="link-active">
            <div className="link">
              <CheckCircle />
              <p>Action Plans</p>
            </div>
          </NavLink>
        </div>
        <div id="main">
          <Route path="/factory" component={Factory} />
          <Route exact path="/" component={Home} />
        </div>
      </div>
    )
  }
}
