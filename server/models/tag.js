// create bookshelf model of eventTags from knex schema here
const db = require('../config/config');

let Tag = db.Model.extend({
    tableName: 'tag',
    hasTimestamps: true
});

module.exports = Tag;