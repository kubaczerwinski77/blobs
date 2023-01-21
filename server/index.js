const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { ClientEvents } = require("./events");

const PORT = 3001;

const app = express();

app.use(cors);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const gameData = {
  players: {},
};

const addPlayer = (socketId) => {
  gameData.players = {
    ...gameData.players,
    [String(socketId)]: {},
  };
};

const removePlayer = (socketId) => {
  delete gameData.players[socketId];
};

const playerMoved = (socketId, newPosition) => {
  gameData.players[socketId] = {
    position: newPosition,
  };
};

// user joined the server
io.on(ClientEvents.CONNECT, (socket) => {
  console.log(`Player joined: ${socket.id}`);
  addPlayer(socket.id);

  console.log("gameData", gameData);

  // receive user moved
  socket.on(ClientEvents.SET_MOVE, (data) => {
    // console.log(data);
    playerMoved(socket.id, data.pos);
    console.log(gameData.players);
  });

  // user left the server
  socket.on(ClientEvents.DISCONNECT, () => {
    console.log(`Player left:   ${socket.id}`);
    removePlayer(socket.id);
    console.log("gameData", gameData);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
