import * as types from '../constants/ActionTypes';

export default function notification(state = {}, action) {

  switch (action.type) {
    case types.ADD_NOTIFICATION: {
      const {message, level} = action.payload;
      return Object.assign({}, state, {
        message,
        level
      });
    }

    default: {
      // console.debug('notification reducer :: hit default', action.type);
      return state;
    }
  }
}
