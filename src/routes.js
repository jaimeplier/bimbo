import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import ScrollToTop from './components/ScrollToTop';

import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
//import NotFound from './pages/NotFound';
import AdminSideNavigation from './pages/AdminSideNavigation';
import ManagerSideNavigation from './pages/ManagerSideNavigation';

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => !!state.get('user'),
  authenticatingSelector: state => state.get('isAuthenticating'),
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: () => (<p style={{textAlign:'center'}}>Loading</p>)
});


const Routes = () => (
  <Router>
    <ScrollToTop>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register/:token" component={Register}/>
        <Route exact path="/logout" component={Logout} />
        <Route path="/factory/:factory" component={userIsAuthenticated(ManagerSideNavigation)} />
        <Route path="/" component={userIsAuthenticated(AdminSideNavigation)} />
      </Switch>
    </ScrollToTop>
  </Router>
)
      // <Route component={NotFound} />

export default Routes;
