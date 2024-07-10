const app = require('automata-app');

const router = require('./media-library-server/router');

app.use(router);

module.exports = app;
