'use strict';

const EventsResolver = require('./resolvers/EventsResolver');

class DomainCatalog {
  constructor(defaultResolver) {
    this.catalog = {
      'default': defaultResolver,
    };
  }

  register(resolver) {
    this.catalog[resolver.getKey()] = resolver;
  }

  matchResolvers(entities) {
    return entities.map((ent) => {
      return this.catalog[ent] || this.catalog['default'];
    });
  }
};


module.exports = {
  DomainCatalog,

  setup() {
    const domainCatalog = new DomainCatalog();
    domainCatalog.register(new EventsResolver());
    return domainCatalog;
  },

  getCatalog() {
    return this.setup();
  },
};
