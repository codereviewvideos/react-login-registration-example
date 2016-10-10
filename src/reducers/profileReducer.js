import {
  PROFILE__REQUESTED,
  PROFILE__SUCCESSFULLY_RECEIVED,
  PROFILE__FAILED_RECEIVING,

  CHANGE_PASSWORD__REQUESTED,
  CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED,
  CHANGE_PASSWORD__FAILED_RECEIVING
}  from '../constants/ActionTypes';

export default function profile(state = {}, action) {

  let {
    id = undefined,
    username = undefined,
    email = undefined
  } = action.payload || {};

  switch (action.type) {

    case PROFILE__REQUESTED:
      return Object.assign({}, state, {});

    case PROFILE__SUCCESSFULLY_RECEIVED:
      return Object.assign({}, state, {
        id,
        username,
        email
      });

    case PROFILE__FAILED_RECEIVING:
      return Object.assign({}, state, {});



    case CHANGE_PASSWORD__REQUESTED:
      return Object.assign({}, state, {});

    case CHANGE_PASSWORD__SUCCESSFULLY_RECEIVED:
      return Object.assign({}, state, {
        id,
        username,
        email
      });

    case CHANGE_PASSWORD__FAILED_RECEIVING:
      return Object.assign({}, state, {});


    default:
      return state;
  }
}
