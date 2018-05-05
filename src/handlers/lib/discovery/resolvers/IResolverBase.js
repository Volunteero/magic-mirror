'use strict';

module.exports = class IResolverBase {
  resolve() {
    throw new Error('not implemented method');
  }

  getKey() {
    throw new Error('not implemented method');
  }
};
