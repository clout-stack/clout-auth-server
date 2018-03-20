/**
 *
 * Nav.react.js
 *
 * This component renders the navigation bar
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/AppActions';
import LoadingButton from './LoadingButton.react';
import PropTypes from 'prop-types';

export class Nav extends Component {
  getNavButtons() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to="/dashboard" className="btn btn--dash btn--nav">Dashboard</Link>
          {this.props.currentlySending ? (
            <LoadingButton className="btn--nav" />
          ) : (
              <a href="#" className="btn btn--login btn--nav" onClick={this._logout}>Logout</a>
          )
        }
        </div>
      );
    }

    return (
        <div>
          <Link to="/register" className="btn btn--login btn--nav">Register</Link>
          <Link to="/login" className="btn btn--login btn--nav">Login</Link>
        </div>
    );
  }

  render() {
    const navButtons = this.getNavButtons();

    return (
      <div className="nav">
        <div className="nav__wrapper">
          <Link to="/" className="nav__logo-wrapper"><h1 className="nav__logo">Login Flow</h1></Link>
          { navButtons }
        </div>
      </div>
    );
  }

  _logout() {
    this.props.dispatch(logout());
  }

  static get propTypes() {
    return {
      loggedIn: PropTypes.bool.isRequired,
      currentlySending: PropTypes.bool.isRequired
    };
  }
};
