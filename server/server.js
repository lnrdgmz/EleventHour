// MODULES ==================================================
require('dotenv').config();
const express = require('express');
// const socketEvents = require('./utils/chatUtils');
const app = express();

// CONFIGURATION =============================================
// configure our server with all the middlware and routing
require('./config/auth')(app);
require('./config/middleware.js')(app, express);

const server = require('http').Server(app);

require('./config/socketio.js')(server);


// Sets the port to either the Process environment's or 3000
const port = process.env.PORT || 3000;

// Run the Server and console.log the port;
if (!module.parent) {
  server.listen(port);
  console.log('Listening on port: ', port);
}

module.exports = app;
