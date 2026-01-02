const { Connection } = require("mongoose");
const { Server } = require("socket.io");
let connections = {}; //List of Connections
let messages = {}; //
let timeOnline = {};
const connectToSocket = (server) => {
  const io = new Server(server); // create Socket.IO server using your HTTP server
  io.on("connection", (socket) => {
    // connection
    socket.on("join-call", (path) => {
      //Typically you’d use this to join a room (Socket.IO concept) so you can broadcast to everyone in that call:
      if (connections[path] === undefined) {
        connections[path] = [];
      }
      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();
    }); // first socket connected  client side listening -.on enter/join those emit is also accept-call
    socket.on("signal", (told, message) => {
      io.to(told).emit("signal".socket.id, message); //list of users present in rooms
      //   connections[path].forEach(ele => {
      //     io.to(ele)
      //   })
      for (let a = 0; a < connections[path].length; i++) {
        io.to(connections[path][a]).emit(
          "user joined",
          socket.id,
          connections[path]
        ); // who is sender and who is receiver
      }
      if (messages[path] === undefined) {
        for (let a = 0; a < connections[path].length; ++a) {
          io.to(socket.id).emit(      //io -The main Socket.IO server instance. Used to send data.
            "chat-message",
            // These 3 things are sent to show old chat history to the newly joined user.
            messages[path][a]["data"],
            messages[path][a]["sender"],
            messages[path][a]["socket-id-sender"]
          );
        }
      }
    });

    socket.on("chat-message", (data, sender) => {
      //Usually you’d broadcast this to a room (or to others in the room).
    });
    socket.on("disconnect", () => {});
  }); // same as event listeners

  return io;
};

module.exports = { connectToSocket };
