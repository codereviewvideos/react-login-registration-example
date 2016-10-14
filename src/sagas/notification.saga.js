import {takeLatest} from 'redux-saga';
import {put} from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';

export function *doAddNotification(action) {
  const {message, level} = action.payload;

  yield put({
    type: types.ADD_NOTIFICATION,
    payload: {
      message,
      level
    }
  });
}

export function *watchNotification() {
  yield* takeLatest(types.ADD_NOTIFICATION, doAddNotification);
}
