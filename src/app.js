const appBuilder = require('automata-app');

const { SECRET, EMAIL_VERIFICATION_SECRET } = require('./config');
// const router = require('./media-library-server/router');

module.exports = ({ db }) => {
<<<<<<< HEAD
  const app = appBuilder({ db, EMAIL_VERIFICATION_SECRET, SECRET });

  // app.use(router({ db }));
=======
  const app = appBuilder({ db });

  app.use(router({ db }));
>>>>>>> 2f563e1 (use app builder api)

  return app;
};
