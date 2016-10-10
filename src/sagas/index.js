/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects';
import { watchLogin, watchLoginFailed, watchLogout } from './auth.saga';
import { watchRequestProfile, watchChangePassword} from './profile.saga';

export default function * rootSaga() {
  yield [
    fork(watchLogin),
    fork(watchLoginFailed),
    fork(watchLogout),

    fork(watchRequestProfile),
    fork(watchChangePassword),
    fork(watchFailedChangingPassword)
  ];
};
