import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import auth from './authReducer';
import notification from './notificationReducer';
import profile from './profileReducer';
import registration from './registrationReducer';
import request from './requestReducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  auth,
  notification,
  profile,
  registration,
  request
});

export default rootReducer;
