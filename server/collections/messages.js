// create collection from userRating table 
const db = require('../config/db-config');
const Message = require('../models/message');

const Messages = new db.Collection();

Messages.model = Message;

module.exports = Messages;
