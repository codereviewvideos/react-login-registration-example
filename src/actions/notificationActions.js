import { ADD_NOTIFICATION } from '../constants/ActionTypes';

export function addNotification(message, level) {
  return {
    type: ADD_NOTIFICATION,
    message,
    level
  };
}
