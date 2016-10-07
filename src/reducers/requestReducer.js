import {
  SENDING_REQUEST
} from '../constants/ActionTypes';

export default function request(state = {
  sendingRequest: false
}, action) {

  switch (action.type) {
    case SENDING_REQUEST:
      return Object.assign({}, state, {
        sendingRequest: action.sendingRequest
      });

    default:
      // console.debug('notification reducer :: hit default', action.type);
      return state;
  }
}
