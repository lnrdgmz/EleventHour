// create bookshelf model of waitList from knex schema here
const db = require('../config/db-config');
const User = require('./user')
const Event = require('./event')

let Attendee = db.Model.extend({
  tableName: 'attendee',
  hasTimestamps: true,
  users: function () {
    return this.belongsTo('User');
  },
  events: function () {
    return this.belongsTo(Event);
  },
});

module.exports = db.model('Attendee', Attendee);