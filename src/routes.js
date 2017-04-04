import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Login from './components/Login';

const Routes = () => (
  <Router>
    <Route exact path="/" component={Login}/>
  </Router>
)

export default Routes;
