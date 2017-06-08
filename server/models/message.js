// create bookshelf model of userRating from knex schema here
const db = require('../config/db-config');
const User = require('./user');

const Message = db.Model.extend({
  tableName: 'messages',
  hasTimestamps: false,
  sender_id: () => this.belongsTo(User),
  recipient_id: () => this.belongsTo(User),
});

module.exports = Message;
