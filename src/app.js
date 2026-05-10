const appBuilder = require('automata-app');

const router = require('./media-library-server/router');

module.exports = ({ db }) => {
  const app = appBuilder({ db });

  app.use(router({ db }));

  return app;
};
