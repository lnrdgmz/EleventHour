// create collection from waitList table 
const db = require('../config/config');
const WaitList = require('../models/waitList');

const WaitLists = new db.Collection();

WaitLists.model = WaitList;

module.exports = WaitLists;