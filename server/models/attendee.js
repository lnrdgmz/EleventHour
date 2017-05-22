// create bookshelf model of waitList from knex schema here
const db = require('../config/config');
const User = require('./user')
const Event = require('./event')

let Attendee = db.Model.extend({
    tableName: 'wait_list',
    hasTimestamps: true,
    user: this.belongsToMany(User),
    event: this.belongsToMany(Event)
});

module.exports = Attendee;