import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import auth from './authReducer';
import notification from './notificationReducer';
import utility from './utilityReducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  auth,
  notification,
  utility
});

export default rootReducer;
