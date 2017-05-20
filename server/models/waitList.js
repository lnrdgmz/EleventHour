// create bookshelf model of waitList from knex schema here
const db = require('../config/config');
const User = require('./user')
const Event = require('./event')

let WaitList = db.Model.extend({
    tableName: 'wait_list',
    hasTimestamps: true
});

module.exports = WaitList;