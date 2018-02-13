import React, { Component } from 'react';
import {
  Home as HomeIcon,
  LogOut,
  Box,
  ChevronDown,
  ChevronUp,
  Copy as CompareIcon,
} from 'react-feather';

import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Poly from './../utils/i18n';


import {
  getFactories,
} from './../actions/dashboardActions';

import {
  toggleFactorySideNav,
} from '../actions/userActions';

import images from '../assets';

import Home from './Home';
import AdminUsers from './AdminUsers';
import AdminCompareFactories from './AdminCompareFactories';

class AdminSideNavigation extends Component {
  constructor(props) {
    super(props);
    this.toggleFactorySideNav = this.toggleFactorySideNav.bind(this);
    const { user } = this.props;
    if (this.props.user.get('access') !== 'Master') {
      const factorySlug = user.get('factorySlug');
      this.noAccess = true;
      return this.props.history.push(`/factory/${factorySlug}`);
    }
  }

  componentWillMount() {
    if (this.noAccess) return;
    if (!this.props.adminFactories) {
      this.props.dispatch(getFactories());
    }
  }

  toggleFactorySideNav() {
    this.props.dispatch(toggleFactorySideNav());
  }

  render() {
    const factories = this.props.adminFactories;
    const factoryOpen = this.props.factoryNavOpen;
    if (this.noAccess) return null;
    return (
      <div>
        <div id="sidenav" className="card-2">
          <div className="user-info center">
            <img src={images.emptyProfileImage} alt="" />
            <p>{ this.props.user && this.props.user.get('name') }</p>
          </div>
          <Link to="/" exact>
            <HomeIcon /><p>Home</p>
          </Link>
          <a
            onClick={this.toggleFactorySideNav}
            role="button"
            tabIndex={0}
          >
            <div
              className={`link ${factories && factories.size ? '' : 'loading'}`}

            >
              <Box /><p>{Poly.t('Factories')}</p>
              { factoryOpen ? <ChevronUp /> : <ChevronDown /> }
            </div>
          </a>
          <div className={`dropdown ${factoryOpen ? ' dropdown-open' : ''}`}>
            { factories && factories.map(factory => (
              <Link
                key={factory.get('slug')}
                to={`/factory/${factory.get('slug')}`}
                extraClass="submenu-link"
              >
                <p>{ factory.get('name') }</p>
              </Link>
              )) }
          </div>
          <Link to="/compare">
            <CompareIcon /><p>{Poly.t('Compare')}</p>
          </Link>
          <Link to="/logout">
            <LogOut /><p>{Poly.t('Log out')}</p>
          </Link>
        </div>
        <div id="main">
          <Route exact path="/" component={Home} />
          <Route path="/users" component={AdminUsers} />
          <Route path="/compare" component={AdminCompareFactories} />
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
    adminFactories: state.get('adminFactories'),
    factoryNavOpen: state.get('sidenavFactoriesOpen'),
  };
}

export default connect(mapStateToProps)(AdminSideNavigation);
