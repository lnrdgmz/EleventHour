// MODULES ==================================================
require('dotenv').config();
const express = require('express');
const socketEvents = require('./utils/chatUtils');
const app = express();
const io = require('socket.io');

// CONFIGURATION =============================================
// configure our server with all the middlware and routing
require('./config/auth')(app);
require('./config/middleware.js')(app, express);

const server = require('http').Server(app);

const socketIo = io(server);

let rooms = [];

socketIo.on('connection', socket => {
  const username = socket.handshake.query.username;
  console.log(`${username} connected`);

  socket.on('send:message', data => {
    console.log(data);
    console.log(`${data.userName}: ${data.message}`);

    // message received from client, now broadcast it to everyone else
    socket.broadcast.emit('server:message', data);
  });

  socket.on('disconnect', () => {
    console.log(`${username} disconnected`);
  });
});

// Sets the port to either the Process environment's or 3000
const port = process.env.PORT || 3000;

// Run the Server and console.log the port;
if (!module.parent) {
  server.listen(port);
  console.log('Listening on port: ', port);
}

module.exports = app;
