import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Login from './components/Login';
import Register from './components/Register';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login}/>
      <Route exact path="/register/:token" component={Register}/>
    </div>
  </Router>
)

export default Routes;
