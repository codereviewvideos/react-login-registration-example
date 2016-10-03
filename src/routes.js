import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import HomePage from './components/HomePage';
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';
import ProfileContainer from './containers/ProfileContainer';
import RegistrationContainer from './containers/RegistrationContainer';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="fuel-savings" component={FuelSavingsPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="logout" component={LogoutPage}/>
    <Route path="profile" component={ProfileContainer}/>
    <Route path="register" component={RegistrationContainer}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
