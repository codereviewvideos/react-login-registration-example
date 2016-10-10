import {
  ADD_NOTIFICATION
} from '../constants/ActionTypes';

export default function notification(state = {}, action) {

  console.log('notification reducer', action);

  switch (action.type) {
    case ADD_NOTIFICATION:
      const { message, level } = action.payload;
      return Object.assign({}, state, {
        message,
        level
      });

    default:
      // console.debug('notification reducer :: hit default', action.type);
      return state;
  }
}
