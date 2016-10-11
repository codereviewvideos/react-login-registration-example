'use strict';

jest.mock('../../src/connectivity/fetch-json-async-await.js');

import React from 'react';
import { login, fetchProfile, changePassword } from '../../src/connectivity/api';
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

      let url = fetchAsync.fetchAsJson.mock.calls[0][0];
      expect(url).toEqual('http://api.rest-user-api.dev/app_acceptance.php/login');

      let requestConfig = fetchAsync.fetchAsJson.mock.calls[0][1];
      let body = JSON.stringify({ username: 'bob', password: 'testpass' });

      expect(requestConfig.body).toEqual(body);
      expect(requestConfig.method).toEqual('POST');
    });


    it('handles the unhappy path', async () => {

      const fetchAsync = require('../../src/connectivity/fetch-json-async-await.js');

      fetchAsync.fetchAsJson = jest.fn(() => { return {
        ok: false,
        statusText: 'No can do',
        status: 401
      }});

      async function doLogin() {
        return await login('baddy', 'badpass');
      }

      const syncFunction = await helpers.syncify(doLogin);
      expect(syncFunction).toThrow('No can do');

      let url = fetchAsync.fetchAsJson.mock.calls[0][0];
      expect(url).toEqual('http://api.rest-user-api.dev/app_acceptance.php/login');

      let requestConfig = fetchAsync.fetchAsJson.mock.calls[0][1];
      let body = JSON.stringify({ username: 'baddy', password: 'badpass' });

      expect(requestConfig.body).toEqual(body);
      expect(requestConfig.method).toEqual('POST');
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

      let url = fetchAsync.fetchAsJson.mock.calls[0][0];
      expect(url).toEqual('http://api.rest-user-api.dev/app_acceptance.php/profile/123');

      let requestConfig = fetchAsync.fetchAsJson.mock.calls[0][1];
      expect(requestConfig.method).toEqual('GET');
    });


    it('handles the unhappy path', async () => {

      const fetchAsync = require('../../src/connectivity/fetch-json-async-await.js');

      fetchAsync.fetchAsJson = jest.fn(() => { return {
        ok: false,
        statusText: 'Blew up',
        status: 400
      }});

      async function doFetchProfile() {
        return await fetchProfile(123);
      }

      const syncFunction = await helpers.syncify(doFetchProfile);

      expect(syncFunction).toThrow('Blew up');

      let url = fetchAsync.fetchAsJson.mock.calls[0][0];
      expect(url).toEqual('http://api.rest-user-api.dev/app_acceptance.php/profile/123');

      let requestConfig = fetchAsync.fetchAsJson.mock.calls[0][1];
      expect(requestConfig.method).toEqual('GET');
    });

  });




  describe('changePassword', () => {

    it('has a happy path', async () => {

      const fetchAsync = require('../../src/connectivity/fetch-json-async-await.js');

      fetchAsync.fetchAsJson = jest.fn(() => { return {
        ok: true,
        json: () => 'worked'
      }});

      let result = await changePassword(123, 'oldpass', 'newpass', 'newpass');
      expect(result).toEqual('worked');

      let url = fetchAsync.fetchAsJson.mock.calls[0][0];
      let requestConfig = fetchAsync.fetchAsJson.mock.calls[0][1];
      let body = JSON.stringify({
        "current_password": 'oldpass',
        "plainPassword": {
          "first": 'newpass',
          "second": 'newpass'
        }
      });

      expect(url).toEqual('http://api.rest-user-api.dev/app_acceptance.php/password/123/change');
      expect(requestConfig.body).toEqual(body);
      expect(requestConfig.method).toEqual('POST');
    });


    it('handles the unhappy path', async () => {

      const fetchAsync = require('../../src/connectivity/fetch-json-async-await.js');

      fetchAsync.fetchAsJson = jest.fn(() => { return {
        ok: false,
        statusText: 'Passwords do not match',
        status: 400
      }});

      async function doChangePassword() {
        return await changePassword(123, 'oldpass', 'newpass', 'newpass-mistake');
      }

      const syncFunction = await helpers.syncify(doChangePassword);

      expect(syncFunction).toThrow('Passwords do not match');

      let url = fetchAsync.fetchAsJson.mock.calls[0][0];
      let requestConfig = fetchAsync.fetchAsJson.mock.calls[0][1];
      let body = JSON.stringify({
        "current_password": 'oldpass',
        "plainPassword": {
          "first": 'newpass',
          "second": 'newpass-mistake'
        }
      });

      expect(url).toEqual('http://api.rest-user-api.dev/app_acceptance.php/password/123/change');
      expect(requestConfig.body).toEqual(body);
      expect(requestConfig.method).toEqual('POST');
    });

  });


});

