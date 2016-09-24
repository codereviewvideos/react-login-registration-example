import {
  PROFILE__REQUESTING,
  PROFILE__SUCCESSFULLY_RECEIVED,
  PROFILE__FAILED_RECEIVING
}  from '../constants/ActionTypes';

export default function fuelSavingsReducer(state = {
  profile: {}
}, action) {

  switch (action.type) {

    case PROFILE__REQUESTING:
      return Object.assign({}, state, {
        isFetching: true
      });

    case PROFILE__SUCCESSFULLY_RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        profile: action.response,
        authenticated: action.authenticated || false
      });

    case PROFILE__FAILED_RECEIVING:
      return Object.assign({}, state, {
        isFetching: false
      });

    default:
      return state;
  }
}
