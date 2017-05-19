// create bookshelf model of tagEventJoin from knex schema here
const db = require('../config/config');
const User = require('./user');
const Event = require('./event');

let TagEventJoin = db.Model.extend({
    tableName: 'tag_event_join',
    hasTimestamps: true
});

module.exports = TagEventJoin;