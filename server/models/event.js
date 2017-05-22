// create bookshelf model of events from knex schema here
const db = require('../config/config');
const Attendee = require('./attendee.js');
const User = require('./user.js');
const EventTag = require('./eventTag.js');
const Category = require('./category.js');

let Event = db.Model.extend({
  tableName: 'event',
  hasTimestamps: true,
  users: function () {
    return this.belongsToMany(User).through(Attendee);
  },
  tags: function () {
    return this.hasMany(Tags).through(EventTag);
  },
  category: function () {
    return this.belongsTo(Category);
  },
});

module.exports = Event;