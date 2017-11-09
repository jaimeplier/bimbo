import React, { Component } from 'react';
import Poly from './../utils/i18n';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Home as HomeIcon,
  CheckCircle,
  Users as UsersIcon,
} from 'react-feather';

import images from '../assets';

import ActionPlans from './ActionPlans';
import FactorySummary from './FactorySummary';

class ManagerSideNavigation extends Component {
  render() {
    const factory = this.props.match.params.factory;
    const baseUrl = '/factory/'+ factory;
    return (
      <div>
        <div id="sidenav" className="card-2">
          <div className="user-info center">
            <img src={images.emptyProfileImage} alt=""/>
            <p>{this.props.user && this.props.user.get('name')}</p>
          </div>
          <Link to={baseUrl} exact={true}>
            <HomeIcon /><p>Home</p>
          </Link>
          <Link to={baseUrl + "/action-plans"}>
            <CheckCircle /><p>{Poly.t('Action Plans')}</p>
          </Link>
          <Link to={baseUrl + "/users"}>
            <UsersIcon /><p>{Poly.t('Users')}</p>
          </Link>
        </div>
        <div id="main">
          <Route path={baseUrl+ "/action-plans"} component={ActionPlans} />
          <Route exact path={baseUrl} component={FactorySummary} />
        </div>
      </div>
    )
  }
}


function Link(props) {
  const extraClass = props.extraClass;
  return (
    <NavLink
      to={props.to}
      activeClassName="link-active"
      exact={props.exact}
    >
      <div className={"link "+ (extraClass ? extraClass : "")}>
        { props.children }
      </div>
    </NavLink>
  )
}


function mapStateToProps(state) {
  return {
    user: state.get('user'),
  }
}

export default connect(mapStateToProps)(ManagerSideNavigation);
