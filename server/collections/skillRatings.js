// create collection from skillRating table 
const db = require('../config/db-config');
const SkillRating = require('../models/skillRating');

const SkillRatings = new db.Collection();

SkillRatings.model = SkillRating;

module.exports = SkillRatings;