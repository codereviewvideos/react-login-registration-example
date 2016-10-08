import {
  PROFILE__REQUESTED,
  PROFILE__SUCCESSFULLY_RECEIVED,
  PROFILE__FAILED_RECEIVING
}  from '../constants/ActionTypes';

export default function profile(state = {}, action) {

  switch (action.type) {

    case PROFILE__REQUESTED:
      return Object.assign({}, state, {});

    case PROFILE__SUCCESSFULLY_RECEIVED:
      let { id, username, email } = action.payload;

      return Object.assign({}, state, {
        id,
        username,
        email
      });

    case PROFILE__FAILED_RECEIVING:
      return Object.assign({}, state, {});

    default:
      return state;
  }
}
