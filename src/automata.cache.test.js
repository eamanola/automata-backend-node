const {
  closeCache, connectCache, getItem, hasItem, removeItem, setItem,
} = require('automata-cache');

const { REDIS_TEST_URL } = require('./config');

describe('automata-cache', () => {
  let cache;

  beforeAll(async () => {
    cache = await connectCache(REDIS_TEST_URL);
  });

  afterAll(async () => {
    await closeCache(cache);
  });

  it('should save, retrive, and remove values', async () => {
    const TEST_KEY = 'foo';
    const val = 'bar';

    expect(await hasItem(cache, TEST_KEY)).toBe(false);

    await setItem(cache, TEST_KEY, val);

    expect(await hasItem(cache, TEST_KEY)).toBe(true);

    expect(await getItem(cache, TEST_KEY)).toBe(val);

    await removeItem(cache, TEST_KEY);

    expect(await getItem(cache, TEST_KEY)).toBeFalsy();

    expect(await hasItem(cache, TEST_KEY)).toBe(false);
  });
});
