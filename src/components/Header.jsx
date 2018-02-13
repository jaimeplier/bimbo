import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon } from 'react-feather';

import images from './../assets';

export default class Header extends Component {
  render() {
    return (
      <div className="header card-2">
        <div className="row">
          <div className="col-6">
            <NavLink to="/">
              <HomeIcon className="icon-sm" />
              <p>Home</p>
            </NavLink>
            { this.props.crumb && this.props.crumb.map(c => (
              <NavLink to={c.to} key={c.to}>
                <p>&#62;</p>
                <p>{c.name}</p>
              </NavLink>
              ))}
          </div>
          <div className="col-6 right no-margin-i">
            <img className="logo" src={images.bimboLogo} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
