import React, { Component } from 'react';
import Poly from './../utils/i18n';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Home as HomeIcon,
  CheckCircle,
  Users as UsersIcon,
  Globe,
} from 'react-feather';

import images from '../assets';

import ActionPlans from './ActionPlans';
import FactorySummary from './FactorySummary';
import FactoryUsers from './FactoryUsers';

import {
  getFactoryInfo,
} from './../actions/factoryActions';

const baseUrl = '/factory/';

class ManagerSideNavigation extends Component {
  componentWillMount() {
    this.props.dispatch(getFactoryInfo(this.props.match.params.factory));
  }

  render() {
    const factory = this.props.match.params.factory;
    const currentUrl = baseUrl + factory;
    const user = this.props.user;
    return (
      <div>
        <div id="sidenav" className="card-2">
          <div className="user-info center">
            <img src={images.emptyProfileImage} alt=""/>
            <p>{this.props.user && this.props.user.get('name')}</p>
          </div>
          { user && user.get('access') === 'Master' ?
            <Link to="/" exact={true}>
              <Globe /><p>{Poly.t('Global')}</p>
            </Link>
          : null }
          <Link to={currentUrl} exact={true}>
            <HomeIcon /><p>Home</p>
          </Link>
          <Link to={currentUrl + "/action-plans"}>
            <CheckCircle /><p>{Poly.t('Action Plans')}</p>
          </Link>
          <Link to={currentUrl + "/users"}>
            <UsersIcon /><p>{Poly.t('Users')}</p>
          </Link>
        </div>
        <div id="main">
          <Route exact path={baseUrl} component={FactorySummary} />
          <Route path={baseUrl+ ":factory/action-plans"} component={ActionPlans} />
          <Route path={baseUrl+ ":factory/users"} component={FactoryUsers} />
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
