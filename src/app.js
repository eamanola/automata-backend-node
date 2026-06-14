const appBuilder = require('automata-app');

const { SECRET, EMAIL_VERIFICATION_SECRET } = require('./config');

module.exports = ({ cache, db }) => {
  const app = appBuilder({
    cache, db, EMAIL_VERIFICATION_SECRET, SECRET,
  });

  // your routers / setup here

  return app;
};
