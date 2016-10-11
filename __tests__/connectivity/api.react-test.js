'use strict';

jest.mock('../../src/connectivity/fetch-json-async-await.js');

import React from 'react';
import { fetchProfile } from '../../src/connectivity/api';
import helpers from '../helpers';

describe('Connectivity', () => {

  describe('fetchProfile', () => {

    it('has a happy path', async () => {

      const fetchAsync = require('../../src/connectivity/fetch-json-async-await.js');

      fetchAsync.fetchAsJson = jest.fn(() => { return {
        ok: true,
        json: () => 'worked'
      }});

      let result = await fetchProfile(123);

      expect(result).toEqual('worked');
    });


    it('handles the unhappy path', async () => {

      const fetchAsync = require('../../src/connectivity/fetch-json-async-await.js');

      fetchAsync.fetchAsJson = jest.fn(() => { return {
        ok: false,
        statusText: 'Blew up',
        status: 400
      }});

      async function doFetch() {
        return await fetchProfile(123);
      }

      const syncFunction = await helpers.syncify(doFetch);

      expect(syncFunction).toThrow('Blew up');
    });


  });


});

