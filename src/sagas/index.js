/* eslint-disable no-constant-condition */
import {fork} from 'redux-saga/effects';
import * as authSaga from './auth.saga';
import * as notificationSaga from './notification.saga';
import * as profileSaga from './profile.saga';
import * as registrationSaga from './register.saga';

export default function *rootSaga() {
  yield [
    fork(authSaga.watchLogin),
    fork(authSaga.watchLoginFailed),
    fork(authSaga.watchLogout),

    fork(profileSaga.watchRequestProfile),
    fork(profileSaga.watchChangePassword),
    fork(profileSaga.watchSucceededChangingPassword),
    fork(profileSaga.watchFailedChangingPassword),

    fork(registrationSaga.watchRegister),
    fork(registrationSaga.watchSucceededChangingPassword),
    fork(registrationSaga.watchFailedRegistering),
  ];
}
