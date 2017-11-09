import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => !!state.get('user'),
  authenticatingSelector: state => state.get('isAuthenticating'),
  wrapperDisplayName: 'UserIsAuthenticated',
});

import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
//import NotFound from './pages/NotFound';
import AdminSideNavigation from './pages/AdminSideNavigation';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register/:token" component={Register}/>
      <Route exact path="/logout" component={Logout} />
      <Route path="/" component={userIsAuthenticated(AdminSideNavigation)} />
    </Switch>
  </Router>
)
      // <Route component={NotFound} />

export default Routes;
