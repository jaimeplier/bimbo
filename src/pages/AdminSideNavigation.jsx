import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Home as HomeIcon,
  CheckCircle,
  LogOut,
  Users as UsersIcon,
  Box,
} from 'react-feather';

import {
  getFactories
} from './../actions/dashboardActions';

import images from '../assets';

import Factory from './Factory';
import Home from './Home';
import ActionPlans from './ActionPlans';
import FactoryUsers from './FactoryUsers';

class AdminSideNavigation extends Component {
  componentWillMount() {
    if(!this.props.adminFactories) {
      this.props.dispatch(getFactories())
    }
  }

  render() {
    return (
      <div>
        <div id="sidenav" className="card-2">
          <div className="user-info center">
            <img src={images.emptyProfileImage} alt='' />
            <p>{ this.props.user && this.props.user.get('name') }</p>
          </div>
          <NavLink to="/" activeClassName="link-active" exact={true}>
            <div className="link">
              <HomeIcon />
              <p>Home</p>
            </div>
          </NavLink>
          <NavLink to="/factories" activeClassName="link-active">
            <div className="link">
              <Box />
              <p>Factories</p>
            </div>
          </NavLink>
          <NavLink to="/action-plans" activeClassName="link-active">
            <div className="link">
              <CheckCircle />
              <p>Action Plans</p>
            </div>
          </NavLink>
          <NavLink to="/users" activeClassName="link-active">
            <div className="link">
              <UsersIcon />
              <p>Users</p>
            </div>
          </NavLink>
          <NavLink to="/logout" activeClassName="link-active">
            <div className="link">
              <LogOut />
              <p>Log out</p>
            </div>
          </NavLink>
        </div>
        <div id="main">
          <Route path="/factory" component={Factory} />
          <Route exact path="/" component={Home} />
          <Route path="/action-plans" component={ActionPlans} />
          <Route path="/users" component={FactoryUsers} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user'),
    adminFactories: state.get('adminFactories')
  }
}

export default connect(mapStateToProps)(AdminSideNavigation);
