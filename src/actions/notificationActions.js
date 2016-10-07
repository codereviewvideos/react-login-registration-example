import { ADD_NOTIFICATION } from '../constants/ActionTypes';

export const LEVEL = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export default function addNotification(message, level) {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      message,
      level
    }
  };
}
