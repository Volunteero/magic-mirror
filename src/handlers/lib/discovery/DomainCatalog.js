'use strict';

const DefaultResolver = require('./resolvers/DefaultResolver');
const EventsResolver = require('./resolvers/EventsResolver');

module.exports = class DomainCatalog {
  constructor() {
    this.catalog = {};
  }

  register(resolver) {
    this.catalog[resolver.getKey()] = resolver;
  }

  matchResolvers(entities) {
    console.log(entities);
    console.log(this.catalog);
    return entities.map((ent) => {
      return this.catalog[ent] || this.catalog['default'];
    });
  }

  setup() {
    const domainCatalog = new DomainCatalog();
    domainCatalog.register(new DefaultResolver());
    domainCatalog.register(new EventsResolver());
    return domainCatalog;
  }

  static getCatalog() {
    return (new DomainCatalog()).setup();
  }
};
