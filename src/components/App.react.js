/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Import stuff
import React, { Component } from 'react';
import { Nav } from './Nav.react.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Nav loggedIn={this.props.data.loggedIn}
             currentlySending={this.props.data.currentlySending}
        />
        {this.props.children}
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    data: state.applicationReducer
  };
};

const dispatchToProps = (dispatch) => {
  return {
    // onSetStyle: (...args) => dispatch(setStyle(...args))
  };
};

export const AppContainer = withRouter(connect(stateToProps, dispatchToProps)(App));

export default AppContainer;
