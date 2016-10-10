'use strict';

const fetchMock = require('fetch-mock');

import fetchJson  from '../../src/connectivity/fetch-json-async-await';

describe('fetchJson', () => {

  const syncify = async (fn) => {
    try {
      const result = await fn();
      return () => { return result; };
    } catch (e) {
      return () => { throw e; };
    }
  };

  afterEach(() => {
    fetchMock.restore();
  });


  it('can fetch', async () => {

    fetchMock.get('*', {hello: 'world'});

    let result = await fetchJson('http://fake.com');

    expect(result.hello).toEqual("world");
  });


  it('handles errors', async () => {

    fetchMock.get('*', { status: 400, body: JSON.stringify("bad data") });


    async function doFetch() {
      return await fetchJson('http://fake.com');
    }

    const syncFunction = await syncify(doFetch);

    expect(syncFunction).toThrow();
  });
});
