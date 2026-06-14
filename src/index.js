const { connectCache, closeCache } = require('automata-cache');
const { drivers } = require('automata-db');
const { logger } = require('automata-utils');

const {
  DB_ENGINE, PORT, REDIS_URL, DB_URL,
} = require('./config');
const appWrapper = require('./app');

const REDIS_ENABLED = !!REDIS_URL;
const DB_ENABLED = !!DB_URL;

let cache;
let db;
if (DB_ENABLED) {
  db = drivers({ DB_ENGINE });
}

const shutdown = (server) => async () => {
  if (db) {
    await db.closeDB();
    logger.info('db connection closed');
  }

  if (REDIS_ENABLED) {
    await closeCache(cache);
    logger.info('cache connection closed');
  }

  server.close(() => {
    logger.info('server closed');
    process.exit(0);
  });
};

const start = async () => {
  if (DB_ENABLED) {
    await db.connectDB(DB_URL);
    logger.info('DB Connected');
  }

  if (REDIS_ENABLED) {
    cache = await connectCache();
    logger.info('Cache Connected');
  }

  const server = appWrapper({ cache, db }).listen(PORT, () => {
    logger.info(`Running on port ${PORT}`);
  });

  const onExit = shutdown(server);
  process.on('SIGINT', onExit);
  process.on('SIGTERM', onExit);
  process.on('SIGHUP', onExit);
};

try {
  start();
} catch (err) {
  logger.error(err);
}
