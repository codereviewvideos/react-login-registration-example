jest.mock('../../src/connectivity/storage');

import { fork } from 'redux-saga/effects';
import rootSaga from '../../src/sagas/index';

describe('Root Saga', () => {

  it('behaves as expected', () => {

    const authSaga = require('../../src/sagas/auth.saga');
    const profileSaga = require('../../src/sagas/profile.saga');

    const generator = rootSaga();

    expect(
      generator.next().value
    ).toEqual(
      [
        fork(authSaga.watchLogin),
        fork(authSaga.watchLoginFailed),
        fork(authSaga.watchLogout),

        fork(profileSaga.watchRequestProfile),
        fork(profileSaga.watchChangePassword),
        fork(profileSaga.watchFailedChangingPassword)
      ]
    );

  });

});
