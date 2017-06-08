const io = require('socket.io');

module.exports = (server) => {
  const socketIo = io(server);

  socketIo.on('connection', (socket) => {
    const username = socket.handshake.query.username;
    console.log(`${username} connected`);

    socket.on('send:message', (data) => {
      console.log(data);
      console.log(`${data.userName}: ${data.message}`);

      // message received from client, now broadcast it to everyone else
      socket.broadcast.emit('server:message', data);
    });

    socket.on('disconnect', () => {
      console.log(`${username} disconnected`);
    });
  });
};
