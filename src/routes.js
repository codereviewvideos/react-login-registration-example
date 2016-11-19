import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routerActions} from 'react-router-redux';
import {UserAuthWrapper} from 'redux-auth-wrapper';

import App from './containers/App';
import HomePage from './components/HomePage.react';
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';
import ProfileContainer from './containers/ProfileContainer';
import RegistrationContainer from './containers/RegistrationContainer';
import AboutPage from './components/AboutPage.react.js';
import NotFoundPage from './components/NotFoundPage.react.js';


// Redirects to /login by default
const userIsAuthenticated = UserAuthWrapper({ // eslint-disable-line babel/new-cap
  authSelector: (state) => state.auth, // how to get the user state
  predicate: (user) => user.isAuthenticated, // function to run against the user state to determine is authenticated
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check,
});

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="logout" component={LogoutPage}/>
    <Route path="profile" component={userIsAuthenticated(ProfileContainer)}/>
    <Route path="register" component={RegistrationContainer}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
