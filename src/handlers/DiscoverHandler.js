'use strict';


module.exports = class DiscoverHandler {
  handle(req, res) {

    const parameters = this.resolveParameters(req);
    console.log(parameters)
    if (!parameters.entities) {
      // TODO: throw custom exception or handle response?
      return this.respond(
        res,
        { message: 'You have not specified what are you looking for' },
        // TODO: make a shared code enumeration?
        406
      )
    }



    res.json({
      message: 'done'
    });
  }

  /**
   * 
   * @param {*} req
   * @returns {} 
   */
  resolveParameters(req) {
    return Object.assign(req.body, {});
  }

  /**
   * A wrapper for the response functionality
   * 
   * @param {*} res 
   * @param {*} data 
   * @param {*} status 
   */
  respond(res, data, status = 200) {
    return res.status(status).json(data);
  }

  /**
   * To handle errors that might have occured during handling.
   * TODO: make it a generic function 
   * 
   * @param {*} res 
   * @param {*} error 
   * @param {*} status 
   * @param {*} data 
   */
  handleError(res, error, status, data) {
    return res.status(status).end();
  }
}