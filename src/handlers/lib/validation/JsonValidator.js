'use strict';

const Validator = require('jsonschema').Validator;

module.exports = {
  getValidator: () => {
    return new Validator();
  },
};
