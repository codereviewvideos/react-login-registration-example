import {
  PROFILE__REQUESTING,
  PROFILE__SUCCESSFULLY_RECEIVED,
  PROFILE__FAILED_RECEIVING
}  from '../constants/ActionTypes';

export default function profileReducer(state = {
  isFetching: false
}, action) {

  switch (action.type) {

    case PROFILE__REQUESTING:
      console.log('PROFILE__REQUESTING - action', action);
      return Object.assign({}, state, {
        isFetching: true
      });

    case PROFILE__SUCCESSFULLY_RECEIVED:
      console.log('PROFILE__SUCCESSFULLY_RECEIVED - action', action);

      let { id, username, email } = action.response;

      return Object.assign({}, state, {
        isFetching: false,
        id,
        username,
        email
      });

    case PROFILE__FAILED_RECEIVING:
      console.log('PROFILE__FAILED_RECEIVING - action', action);
      return Object.assign({}, state, {
        isFetching: false
      });

    default:
      return state;
  }
}
