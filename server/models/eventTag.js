// create bookshelf model of tagEventJoin from knex schema here
const db = require('../config/db-config');
const Tag = require('./tag');
const Event = require('./event');

const EventTag = db.Model.extend({
  tableName: 'event_tag',
  hasTimestamps: true,
  tags: () => this.belongsToMany(Tag),
  events: () => this.belongsToMany(Event),
});

module.exports = EventTag;
