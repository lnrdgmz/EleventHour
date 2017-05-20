// create bookshelf model of skillRatings from knex schema here
const db = require('../config/config');
const User = require('./user.js');
const eventTag = require('./eventTag.js');

let SkillRating = db.Model.extend({
    tableName: 'skill_rating',
    hasTimestamps: true
});

module.exports = SkillRating;