// create collection from eventtag table 
const db = require('../config/db-config');
const Tag = require('../models/tag');

const Tags = new db.Collection();

Tags.model = Tag;

module.exports = Tags;