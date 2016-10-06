import {
  FAILED_REQUEST
} from '../constants/ActionTypes';

export default function failedRequest(state = {}, action) {

  switch (action.type) {

    case FAILED_REQUEST:
      console.log('failed request?', action);
      return Object.assign({}, state, {
        fuckedUp: true
      });

    default:
      return state;
  }
}
