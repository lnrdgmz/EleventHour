// create collection from event table 
const db = require('../config/db-config');
const Event = require('../models/event');

const Events = new db.Collection();

Events.model = Event;

module.exports = Events;