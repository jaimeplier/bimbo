import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import {
  Home as HomeIcon,
  CheckCircle,
  Award,
  Users as UsersIcon,
  Smartphone,
  Globe,
  LogOut,
} from 'react-feather';
import { connect } from 'react-redux';

import Poly from './../utils/i18n';

import FactoryActionPlans from './FactoryActionPlans';
import FactorySummary from './FactorySummary';
import FactoryUsers from './FactoryUsers';
import FactoryManagers from './FactoryManagers';
import FactoryLots from './FactoryLots';

import images from '../assets';

import {
  getFactoryInfo,
} from './../actions/factoryActions';


const baseUrl = '/factory/';

class ManagerSideNavigation extends Component {
  componentWillMount() {
    this.props.dispatch(getFactoryInfo(this.props.match.params.factory));
  }

  render() {
    const { factory } = this.props.match.params;
    const currentUrl = baseUrl + factory;
    const { user } = this.props;
    return (
      <div>
        <div id="sidenav" className="card-2">
          <div className="user-info center">
            <img src={images.emptyProfileImage} alt="" />
            <p>{this.props.user && this.props.user.get('name')}</p>
          </div>
          { user && user.get('access') === 'Master' ?
            <Link to="/" exact>
              <Globe /><p>{Poly.t('Global')}</p>
            </Link>
          : null }
          <Link to={currentUrl} exact>
            <HomeIcon /><p>{Poly.t('Summary')}</p>
          </Link>
          <Link to={`${currentUrl}/action-plans`}>
            <CheckCircle /><p>{Poly.t('Action Plans')}</p>
          </Link>
          <Link to={`${currentUrl}/lots`}>
            <Award /><p>{Poly.t('Lots')}</p>
          </Link>
          <Link to={`${currentUrl}/scorers`}>
            <Smartphone /><p>{Poly.t('Scorers')}</p>
          </Link>
          <Link to={`${currentUrl}/managers`}>
            <UsersIcon /><p>{Poly.t('Managers')}</p>
          </Link>
          <Link to="/logout">
            <LogOut /><p>{Poly.t('Log out')}</p>
          </Link>
        </div>
        <div id="main">
          <Route exact path={`${baseUrl}:factory`} component={FactorySummary} />
          <Route path={`${baseUrl}:factory/action-plans`} component={FactoryActionPlans} />
          <Route path={`${baseUrl}:factory/lots`} component={FactoryLots} />
          <Route path={`${baseUrl}:factory/scorers`} component={FactoryUsers} />
          <Route path={`${baseUrl}:factory/managers`} component={FactoryManagers} />
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line
function Link(props) {
  const { extraClass } = props;
  return (
    <NavLink
      to={props.to}
      activeClassName="link-active"
      exact={props.exact}
    >
      <div className={`link ${extraClass || ''}`}>
        { props.children }
      </div>
    </NavLink>
  );
}


function mapStateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(mapStateToProps)(ManagerSideNavigation);
