const cache = require('automata-cache');
const { connectDB, closeDB } = require('automata-db');
const { utils } = require('automata-utils');

const appWrapper = require('./app');
const { PORT, REDIS_URL, DB_URL } = require('./config');

const REDIS_ENABLED = !!REDIS_URL;
const DB_ENABLED = !!DB_URL;

const { initCache, connectCache, closeCache } = cache;
const { logger } = utils;

let db;

const shutdown = (server) => async () => {
  if (db) await closeDB(db);
  logger.info('db connection closed');

  if (REDIS_ENABLED) await closeCache();
  logger.info('cache connection closed');

  server.close(() => {
    logger.info('server closed');
    process.exit(0);
  });
};

const start = async () => {
  if (DB_ENABLED) {
    db = await connectDB(DB_URL);
    logger.info('DB Connected');
  }

  if (REDIS_ENABLED) {
    await initCache();
    await connectCache();
    logger.info('Cache Connected');
  }

  const server = appWrapper({ db }).listen(PORT, () => {
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
