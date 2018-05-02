'use strict';

module.exports = class DiscoverHandler {
  handle(req, res) {

        

    res.json({
      message: 'done'
    });
  }

  resolveError(res, error, status, data) {
    res.status(status).end();
  }
}