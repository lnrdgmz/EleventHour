// create bookshelf model of userRating from knex schema here
const db = require('../config/config');

let UserRating = db.Model.extend({
    tableName: 'user_rating',
    hasTimestamps: true
});

module.exports = UserRating;