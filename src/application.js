/**
 * React Application
 */

// Import all the third party stuff
import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch, withRouter, Redirect, BrowserRouter} from 'react-router-dom';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createHashHistory from 'history/createHashHistory';

// Import application stuff
import * as applicationReducers from './reducers';

// Import application style
import './style/application.scss';

// Import components
import HomePage from './components/pages/HomePage.react.js';
import LoginPage from './components/pages/LoginPage.react.js';
import RegisterPage from './components/pages/RegisterPage.react.js';
import Dashboard from './components/pages/Dashboard.react.js';
import NotFound from './components/pages/NotFound.react.js';
import App from './components/App.react.js';

class Root extends React.Component {
    componentWillMount() {
        let hashHistory = createHashHistory();

        this.reducer = combineReducers({
            ...applicationReducers,
            routing: routerReducer
        });
        this.store = createStore(
            this.reducer,
            applyMiddleware(thunk, routerMiddleware(hashHistory))
        );
    }

    render() {
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.store.getState().loggedIn
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )} />
        );

        return (
            <Provider store={this.store}>
                <BrowserRouter>
                    <App>
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </App>
                </BrowserRouter>
            </Provider>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('app')
);