import { FAILED_REQUEST } from '../constants/ActionTypes';

export default function failedRequest(errorCode, errorMessage) {
  return {
    type: FAILED_REQUEST,
    errorCode,
    errorMessage
  };
}
