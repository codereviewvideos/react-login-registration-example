import { ADD_NOTIFICATION } from '../constants/ActionTypes';



export default function addNotification(message, level) {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      message,
      level
    }
  };
}
