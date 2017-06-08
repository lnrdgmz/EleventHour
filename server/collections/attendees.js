// create collection from Attendee table 
const db = require('../config/db-config');
const Attendee = require('../models/attendee');

const Attendees = new db.Collection();

Attendees.model = Attendee;

module.exports = Attendees;