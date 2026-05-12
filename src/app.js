const appBuilder = require('automata-app');

const { SECRET, EMAIL_VERIFICATION_SECRET } = require('./config');

module.exports = ({ db }) => {
  const app = appBuilder({ db, EMAIL_VERIFICATION_SECRET, SECRET });

  // your routers / setup here

  return app;
};
