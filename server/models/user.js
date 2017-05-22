// create bookshelf model of user from knex schema here
const db = require('../config/config');
const Event = require('./event.js');
const Attendee = require('./attendee.js');
const UserRating = require('./userRating.js');
const SkillRating = require('./skillRating.js');

let User = db.Model.extend({
    tableName: 'user',
    hasTimestamps: true,
    events: () => this.belongsToMany(Event).through(Attendee),
    userRatings: () => this.hasMany(UserRating),
    skillRatings: () => this.hasMany(SkillRating)
});

module.exports = User;