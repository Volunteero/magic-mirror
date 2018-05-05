'use strict';

const IResolverBase = require('./IResolverBase');

/**
 * The resolver to be used for the unkown domains
 * @class DefaultResolver
 */
module.exports = class DefaultResolver extends IResolverBase {
  constructor() {
    super();
    this.DATA = [];
    this.KEY = 'default';
  }

  /**
   * Returns the identification of the domain
   * @return {string}
   */
  getKey() {
    return this.KEY;
  }

  /**
   * Returns an emtpy array of elements
   * @return {Array}
   */
  resolve() {
    return this.DATA;
  }
};
