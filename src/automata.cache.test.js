const cacheFactory = require('automata-cache');

const { REDIS_TEST_URL } = require('./config');

describe('automata-cache', () => {
  const cache = cacheFactory({ AUTOMATA_CACHE: 'use-mock' });

  beforeAll(async () => {
    await cache.connectCache(REDIS_TEST_URL);
  });

  afterAll(async () => {
    await cache.closeCache();
  });

  it('should save, retrive, and remove values', async () => {
    const TEST_KEY = 'foo';
    const val = 'bar';

    expect(await cache.hasItem(TEST_KEY)).toBe(false);

    await cache.setItem(TEST_KEY, val);

    expect(await cache.hasItem(TEST_KEY)).toBe(true);

    expect(await cache.getItem(TEST_KEY)).toBe(val);

    await cache.removeItem(TEST_KEY);

    expect(await cache.getItem(TEST_KEY)).toBeFalsy();

    expect(await cache.hasItem(TEST_KEY)).toBe(false);
  });
});
