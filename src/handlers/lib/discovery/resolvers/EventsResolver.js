'use strict';

const IResolverBase = require('./IResolverBase');

// FIXME: delete this mock thing
const mockData = [
  {
    title: 'Helping Strangers with Strangers',
    host: 'Stranger Starngers',
    description: 'Help the strangers with some other strangers',
    location: 'San Juan Capistrano, US',
  },
  {
    title: 'Cleaning the dog shelter',
    host: 'Stranger Strangers',
    description: 'Help the strangers clean their strange shelters',
    location: 'San Juan Capistrano, US',
  },
  {
    title: 'Cook bruscettas for homeless',
    host: 'Heroic Helpers',
    description: 'Let\'s feed the homeless with bruscettas',
    location: 'Amsterdam, NL',
  },
  {
    title: 'Public reading',
    host: 'Stranger Starngers',
    description: 'Read for the lonely',
    location: 'San Juan Capistrano, US',
  },
  {
    title: 'Hospital renovation',
    host: 'Artistic Hearts',
    description: 'We are making the children hospital in Bolzano pretty again!',
    location: 'Bolzano, IT',
  },
];


/**
 * The resolver to be used for the unkown domains
 * @class DefaultResolver
 */
module.exports = class EventsResolver extends IResolverBase {
  constructor() {
    super();
    // TODO: change to calling the API with some querying logic included
    this.DATA = mockData;
    this.KEY = 'events';
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
    return this.DATA.sort(() => {
      return 0.5 - Math.random();
    });
  }
};
