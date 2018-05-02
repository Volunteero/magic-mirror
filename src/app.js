'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const Router = require('./routes/Router');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* App startup */
const server = app.listen(process.env.PORT || 5000, () => {
  console.info(
    'Express server listening on port %d in %s mode',
    server.address().port,
    app.settings.env
  );
  console.info(`http://localhost:${server.address().port}`);
  console.info(`PID: ${process.pid}`);

  const router = new Router();
  const routes = router.config(app);

  console.info('Configured routes:')
  routes.forEach(route => {
    console.info(route);
  })
});


/* Graceful app shutdown */
const shutDown = () => {
  console.info('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.info('Successfuly closed');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 500);
};

process.on('SIGTERM', shutDown);

process.on('SIGINT', shutDown);

module.exports = app;