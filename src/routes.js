import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import App from './containers/App';
import HomePage from './components/HomePage.react';
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';
import ProfileContainer from './containers/ProfileContainer';
import RegistrationContainer from './containers/RegistrationContainer';
import AboutPage from './components/AboutPage.react.js';
import NotFoundPage from './components/NotFoundPage.js';


// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth, // how to get the user state
  predicate: user => user.isAuthenticated, // function to run against the user state to determine is authenticated
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check,
});

// const LoginWrapper = UserAuthWrapper({
//   authSelector: state => state.auth,
//   redirectAction: routerActions.replace,
//   wrapperDisplayName: 'LoginWrapper',
//   predicate: user => user.isAuthenticated,
//   failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
//   authenticatingSelector: state => state.request.sendingRequest,
//   allowRedirectBack: false,
// });


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="logout" component={LogoutPage}/>
    <Route path="profile" component={UserIsAuthenticated(ProfileContainer)}/>
    <Route path="register" component={RegistrationContainer}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
