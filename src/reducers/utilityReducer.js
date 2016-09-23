import {
  SENDING_REQUEST
} from '../constants/ActionTypes';

export default function utility(state = {}, action) {
  switch (action.type) {
    case SENDING_REQUEST:

      console.log('cluck cluck' );
      return Object.assign({}, state, {
        sendingRequest: action.sendingRequest
      });

    default:
      // console.debug('notification reducer :: hit default', action.type);
      return state;
  }
}
