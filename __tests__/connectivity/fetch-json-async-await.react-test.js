'use strict';

const fetchMock = require('fetch-mock');

import fetchAsync from '../../src/connectivity/fetch-json-async-await';
import helpers from '../../setupJest';

// https://github.com/facebook/jest/issues/1377
// https://github.com/philholden/react-project-archetype/blob/master/init/package.json
// https://github.com/philholden/flow-tabs
describe('fetchJson', () => {

  afterEach(() => {
    fetchMock.restore();
  });


  it('can fetch', async () => {

    fetchMock.get('*', {hello: 'world'});

    let result = await fetchAsync.fetchAsJson('http://fake.com');

    expect(result.hello).toEqual("world");
  });


  it('handles errors', async () => {

    fetchMock.get('*', {
      status: 400,
      body: JSON.stringify("bad data")
    });

    async function doFetch() {
      return await fetchAsync.fetchAsJson('http://fake.com');
    }

    const syncFunction = await helpers.syncify(doFetch);

    expect(syncFunction).toThrow();
  });


  it('displays a nicer error message if one is provided', async () => {

    fetchMock.get('*', {
      status: 403,
      body: JSON.stringify("bad data")
    });

    async function doFetch() {
      return await fetchAsync.fetchAsJson('http://fake.com');
    }

    const syncFunction = await helpers.syncify(doFetch);

    expect(syncFunction).toThrow('Forbidden');
  });
});
