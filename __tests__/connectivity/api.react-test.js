'use strict';

jest.mock('../../src/connectivity/fetch-json-async-await.js');

import React from 'react';
import { login, fetchProfile } from '../../src/connectivity/api';
import helpers from '../helpers';

describe('Connectivity', () => {


  describe('login', () => {

    it('has a happy path', async () => {

      const fetchAsync = require('../../src/connectivity/fetch-json-async-await.js');

      fetchAsync.fetchAsJson = jest.fn(() => { return {
        ok: true,
        json: () => 'worked'
      }});

      let result = await login('bob', 'testpass');

      expect(result).toEqual('worked');
    });


    it('handles the unhappy path', async () => {

      const fetchAsync = require('../../src/connectivity/fetch-json-async-await.js');

      fetchAsync.fetchAsJson = jest.fn(() => { return {
        ok: false,
        statusText: 'No can do',
        status: 401
      }});

      async function doFetch() {
        return await login('baddy', 'badpass');
      }

      const syncFunction = await helpers.syncify(doFetch);

      expect(syncFunction).toThrow('No can do');
    });

  });


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

