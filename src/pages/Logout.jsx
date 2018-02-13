import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  logout,
} from '../actions/userActions';

class Logout extends Component {
  componentWillMount() {
    this.props.dispatch(logout(() => {
      this.props.history.push('/login');
    }));
  }

  render() {
    return (
      <p className="center">Loging out...</p>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Logout);
