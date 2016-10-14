jest.mock('../../src/connectivity/storage');

import {fork} from 'redux-saga/effects';
import rootSaga from '../../src/sagas/index';

describe('Root Saga', () => {

  it('behaves as expected', () => {

    const authSaga = require('../../src/sagas/auth.saga');
    const notificationSaga = require('../../src/sagas/notification.saga');
    const profileSaga = require('../../src/sagas/profile.saga');
    const registrationSaga = require('../../src/sagas/register.saga');

    const generator = rootSaga();

    expect(
      generator.next().value
    ).toEqual(
      [
        fork(authSaga.watchLogin),
        fork(authSaga.watchLoginFailed),
        fork(authSaga.watchLogout),

        fork(notificationSaga.watchNotification),

        fork(profileSaga.watchRequestProfile),
        fork(profileSaga.watchChangePassword),
        fork(profileSaga.watchSucceededChangingPassword),
        fork(profileSaga.watchFailedChangingPassword),

        fork(registrationSaga.watchRegister),
        fork(registrationSaga.watchSucceededChangingPassword),
        fork(registrationSaga.watchFailedRegistering),
      ]
    );

  });

});
