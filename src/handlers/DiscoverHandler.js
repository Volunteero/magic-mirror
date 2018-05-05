'use strict';

const JsonValidator = require('./lib/validation/JsonValidator');
const DomainCatalog = require('./lib/discovery/DomainCatalog');

const querySchema = {
  'id': '/DiscoveryQuery',
  'type': 'object',
  'properties': {
    'entities': {
      'type': 'array',
      'items': {'type': 'string'},
      'minItems': 1,
    },
  },
  'required': ['entities'],
};


module.exports = class DiscoverHandler {
  constructor() {
    this.querySchema = querySchema;
  }

  handle(req, res) {
    const query = this.resolveParameters(req);
    console.log(query);

    const validation = JsonValidator.getValidator()
      .validate(query, this.querySchema);

    console.log(validation);

    // TODO: throw custom exception or handle response?
    // TODO: make a shared code enumeration?
    if (validation.errors.length > 0) {
      const responseData = this.prepareValidationErrorData(validation.errors);
      return this.respond(res, responseData, 406);
    }

    const entities = validation.instance.entities.map((entity) => entity);

    const domainCatalog = DomainCatalog.getCatalog();
    const resolvers = domainCatalog.matchResolvers(entities);

    console.log(resolvers);

    const resolutions = resolvers.map((resolver) => resolver.resolve());
    Promise.all(resolutions)
      .then((results) => {
        const reduced = results.reduce((accum, val) => {
          return accum.concat(val);
        }, []);
        res.json({
          message: 'done',
          entities: entities,
          results: reduced,
        });
      });
  }

  /**
   * Get parameters fromt the request
   *
   * @param {*} req
   * @return {*}
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
   * @return {null}
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
   * @return {null}
   */
  handleError(res, error, status, data) {
    return res.status(status).end();
  }

  /**
   * Prepares the response data fromt the validation error
   * @param {Array} errors
   * @return {{message: string, errors: Array}}
   */
  prepareValidationErrorData(errors) {
    return {
      message: 'You have incorrectly specified what you are looking for',
      errors: errors.map((err) => {
        return err.message;
      }),
    };
  }
};
