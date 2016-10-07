import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { fetchProfile } from '../connectivity/api';


export function * doRequestProfile(action) {

  console.log('A?A?A?A?A', action);

  try {

    const { userId } = action.payload;

    console.log('got user id', userId);

    yield put({
      type: types.SENDING_REQUEST,
      payload: {sendingRequest: true}
    });

    const responseBody = yield call(fetchProfile, userId);

    console.log('response body', responseBody);

    const { username, email } = responseBody;

    yield put({
      type: types.PROFILE__SUCCESSFULLY_RECEIVED,
      payload: {
        id: userId,
        username,
        email
      }
    });

  } catch (e) {

    console.log('it all went wrong', e);

    yield put({
      type: types.PROFILE__FAILED_RECEIVING,
      payload: {
        message: e.message,
        statusCode: e.statusCode
      }
    });

  } finally {
    yield put({
      type: types.SENDING_REQUEST,
      payload: {sendingRequest: false}
    });
  }

}

export function * watchRequestProfile() {
  yield* takeLatest(types.PROFILE__REQUESTED, doRequestProfile);
}
