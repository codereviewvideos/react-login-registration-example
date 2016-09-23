import { SENDING_REQUEST } from '../constants/ActionTypes';

export function sendingRequest(sendingRequest) {
  return {
    type: SENDING_REQUEST,
    sendingRequest
  };
}
