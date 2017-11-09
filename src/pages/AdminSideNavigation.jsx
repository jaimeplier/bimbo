import React, { Component } from 'react';
import Poly from './../utils/i18n';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Home as HomeIcon,
  LogOut,
  Users as UsersIcon,
  Box,
} from 'react-feather';

import {
  getFactories
} from './../actions/dashboardActions';

import images from '../assets';

import Home from './Home';
import FactoryUsers from './FactoryUsers';

class AdminSideNavigation extends Component {
  componentWillMount() {
    if(!this.props.adminFactories) {
      this.props.dispatch(getFactories())
    }
  }

  render() {
    const factories = this.props.adminFactories;
    return (
      <div>
        <div id="sidenav" className="card-2">
          <div className="user-info center">
            <img src={images.emptyProfileImage} alt='' />
            <p>{ this.props.user && this.props.user.get('name') }</p>
          </div>
          <Link to="/" exact={true}>
              <HomeIcon /><p>Home</p>
          </Link>
          <Link to="/factory">
              <Box /><p>{Poly.t('Factories')}</p>
          </Link>
          { factories && factories.map((factory) => {
            return (
              <Link
                key={factory.get("slug")}
                to={"/factory/"+ factory.get("slug")}
                extraClass="submenu-link"
              >
                <p>{ factory.get('name') }</p>
              </Link>
            )
          }) }
          <Link to="/users">
            <UsersIcon /><p>{Poly.t('Users')}</p>
          </Link>
          <Link to="/logout">
              <LogOut /><p>{Poly.t('Log out')}</p>
          </Link>
        </div>
        <div id="main">
          <Route exact path="/" component={Home} />
          <Route path="/users" component={FactoryUsers} />
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
    adminFactories: state.get('adminFactories')
  }
}

export default connect(mapStateToProps)(AdminSideNavigation);
