const { DB_URL, DB_ENGINE } = require('../src/config');
global.db = require('automata-db')({ DB_ENGINE });

const SKIP_PATHS = [];
const { testPath } = expect.getState();
const skip = () => SKIP_PATHS.some((skipPath) => testPath.includes(skipPath));

beforeAll(async () => {
  if (skip()) {
    return;
  }

  await global.db.connectDB(DB_URL);
});

afterAll(async () => {
  if (skip()) {
    return;
  }

  await global.db.closeDB();
});
