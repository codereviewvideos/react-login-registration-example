import React from 'react';
import * as types from '../../src/constants/ActionTypes';

describe('Constants', () => {
  test('Request', () => {
    expect(types.SENDING_REQUEST).toBeDefined();
  });

  test('Notification', () => {
    expect(types.ADD_NOTIFICATION).toBeDefined();
  });

  test('Login', () => {
    expect(types.LOGIN__REQUESTED).toBeDefined();
    expect(types.LOGIN__SUCCEEDED).toBeDefined();
    expect(types.LOGIN__FAILED).toBeDefined();
  });

  test('Logout', () => {
    expect(types.LOGOUT__REQUESTED).toBeDefined();
    expect(types.LOGOUT__SUCCESS).toBeDefined();
  });

  test('Profile', () => {
    expect(types.PROFILE__REQUESTED).toBeDefined();
    expect(types.PROFILE__SUCCESSFULLY_RECEIVED).toBeDefined();
    expect(types.PROFILE__FAILED_RECEIVING).toBeDefined();
  });
});

