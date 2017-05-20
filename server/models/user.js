// create bookshelf model of user from knex schema here
const db = require('../config/config');

let User = db.Model.extend({
    tableName: 'user',
    hasTimestamps: true
});

module.exports = User;