'use strict';

jest.mock('../../src/utils/localStorage');

import storage from '../../src/connectivity/storage';

describe('storage', () => {

  it('can save', () => {

    const mockStorage = require('../../src/utils/localStorage').default;
    mockStorage.setItem = jest.fn(() => true);

    storage.save('key', 'value');

    expect(mockStorage.setItem.mock.calls[0]).toEqual(['key', 'value']);
  });

  it('can get', () => {

    const mockStorage = require('../../src/utils/localStorage').default;
    mockStorage.getItem = jest.fn(() => true);

    storage.get('key');

    expect(mockStorage.getItem.mock.calls[0]).toEqual(['key']);
  });

  it('can cleanUp', () => {

    const mockStorage = require('../../src/utils/localStorage').default;
    mockStorage.removeItem = jest.fn(() => true);

    storage.cleanUp();

    expect(mockStorage.removeItem.mock.calls[0]).toEqual(['id_token']);
    expect(mockStorage.removeItem.mock.calls[1]).toEqual(['profile']);
  });
});
