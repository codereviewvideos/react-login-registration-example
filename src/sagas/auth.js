import {takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { login } from './api';

function * doLogin(action) {
  try {

    console.log('login generator was hit', action);

    let { username, password } = action.payload;

    console.log('got me some data', username, password);

    const user = yield call(login, username, password);

    console.log(' i got me a user', user);
    yield put({type: types.LOGIN__SUCCEEDED, user});


  } catch (e) {


    console.log('it all went wrong', e);


    yield put({
      type: types.LOGIN__FAILED,
      message: e.message,
      statusCode: e.statusCode
    });


  }
}

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
 */
export function * watchLogin() {
  console.log('am i watch login#?' );
  yield* takeLatest(types.LOGIN__REQUESTED, doLogin);
}





export function * doLoginFailed(error) {
  yield put({
    type: types.ADD_NOTIFICATION,
    message: error.message,
    level: 'warning'
  });

  localStorage.removeItem('idToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
}

export function * watchLoginFailed() {
  console.log('am i watch login failed');
  yield* takeLatest(types.LOGIN__FAILED, doLoginFailed);
}
