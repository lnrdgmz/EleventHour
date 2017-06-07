// create collection from userRating table 
const db = require('../config/db-config');
const UserRating = require('../models/userRating');

const UserRatings = new db.Collection();

UserRatings.model = UserRating;

module.exports = UserRatings;