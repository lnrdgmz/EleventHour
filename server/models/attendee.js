// create bookshelf model of waitList from knex schema here
const db = require('../config/config');
const User = require('./user')
const Event = require('./event')

let Attendee = db.Model.extend({
    tableName: 'attendee',
    hasTimestamps: true,
    users: () =>  this.belongsToMany(User),
    events: () => this.belongsToMany(Event)
});

module.exports = Attendee;