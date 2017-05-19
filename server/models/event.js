// create bookshelf model of events from knex schema here
const db = require('../config/config');
const WaitList = require('./waitList.js');
const User = require('./user.js');

let Event = db.Model.extend({
    tableName: 'event',
    hasTimestamps: true
});

module.exports = Event;