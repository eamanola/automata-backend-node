const appBuilder = require('automata-app');

const { SECRET, EMAIL_VERIFICATION_SECRET } = require('./config');
const router = require('./media-library-server/router');

module.exports = ({ db }) => {
  const app = appBuilder({ db, EMAIL_VERIFICATION_SECRET, SECRET });

  app.use(router({ db }));

  return app;
};
