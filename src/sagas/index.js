/* eslint-disable no-constant-condition */
import { fork } from 'redux-saga/effects';
import * as authSaga from './auth.saga';
import * as profileSaga from './profile.saga';

export default function * rootSaga() {
  yield [
    fork(authSaga.watchLogin),
    fork(authSaga.watchLoginFailed),
    fork(authSaga.watchLogout),

    fork(profileSaga.watchRequestProfile),
    fork(profileSaga.watchChangePassword),
    fork(profileSaga.watchSucceededChangingPassword),
    fork(profileSaga.watchFailedChangingPassword)
  ];
};
