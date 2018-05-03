'use strict';

const DiscoverHandler = require('../handlers/DiscoverHandler');

module.exports = class Router {
  /**
   * Configures the routes for the application 
   * The express app reference is passed as the first argument 
   * The handlerRegistry is a module with according handler references
   * 
   * @param {*} app 
   * @param {*} handlerRegistry 
   * @returns {Array}
   */
  config(app, handlerRegistry) {

    const routes = [];

    // Index

    const indexPath = '/';
    app.get(indexPath, (req, res) => {
      const result = {
        message: 'oh, hi there'
      };
      res.json(result);
    })

    routes.push({
      path: `get: ${indexPath}`,
    })

    // Heartbeat

    const heartbeatPath = '/heartbeat/';
    app.get(heartbeatPath, (req, res) => {
      const result = {
        message: 'tum-tum'
      };
      res.json(result);
    })

    routes.push({
      path: `get: ${heartbeatPath}`,
    })


    /**
     * The handlers for specific endpoints go here
     * TODO: maybe we could use a config file like a sls.yml but our own?
     */

    // Discover

    const discoverPath = '/discover/';
    const discoverHandler = new DiscoverHandler();
    app.put(discoverPath, (req, res) => {
      try {

        discoverHandler.handle(req, res);
      } catch (error) {

        discoverHandler.handleError(res, error, 400, {});
      }
    })

    routes.push({
      path: `put: ${discoverPath}`,
    })


    return routes;
  }
}