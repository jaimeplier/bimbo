import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Home from './components/Home.jsx';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login}/>
      <Route exact path="/register/:token" component={Register}/>
    </div>
  </Router>
)
      // <Route component={NotFound} />

export default Routes;
