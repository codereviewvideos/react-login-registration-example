jest.mock('redux');

import React from 'react';
import rootReducer from '../../src/reducers/index';

describe('Reducers Index', () => {

  it('ensures only the expected reducers are in use', () => {
    const redux = require('redux');
    const callToCombineReducers = redux.combineReducers.mock.calls[0][0];
    const reducersInUse = Object.keys(callToCombineReducers);

    expect(reducersInUse).toEqual([
      "form",
      "routing",
      "auth",
      "notification",
      "profile",
      "request"
    ]);
  });

});

