// create bookshelf model of user from knex schema here
const clone = require('lodash').clone;

const db = require('../config/config');
const Event = require('./event.js');
const Attendee = require('./attendee.js');
const UserRating = require('./userRating.js');
const SkillRating = require('./skillRating.js');

let User = db.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  events: function() {
    return this.belongsToMany(Event).through(Attendee).withPivot(['flag']);
  },
  createdEvents: function () {
    return this.belongsToMany(Event).through(Attendee).query({ where: { flag: 'creator' } });
  },
  userRatings: function () {
    return this.hasMany(UserRating);
  },
  skillRatings: function () {
    return this.hasMany(SkillRating);
  },
  serialize: function (options) {
    const attrs = clone(this.attributes);
    if (options && options.shallow) return attrs;
    const relations = this.relations;
    for (let key in relations) {
      const relation = relations[key];
      attrs[key] = relation.toJSON ? relation.toJSON(options) : relation;
    }
    if (options && options.omitPivot) return attrs;
    if (this.pivot) {
      const pivot = this.parse(this.pivot.attributes);
      attrs.role = pivot.flag;
    }
    return attrs;
  },
});

module.exports = db.model('User', User);
