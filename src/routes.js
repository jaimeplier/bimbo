import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Home from './pages/Home.jsx';

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
