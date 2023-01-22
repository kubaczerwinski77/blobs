const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { ClientEvents, ServerEvents } = require("./events");
const _ = require("lodash");

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
  started: false,
};

const addPlayer = (player) => {
  gameData.players = {
    ...gameData.players,
    [player.id]: {
      id: player.id,
      username: player.username,
      host: player.host,
    },
  };
};

const removePlayer = (socketId) => {
  if (gameData.players[socketId].host) {
    delete gameData.players[socketId];
    changeHost();
  } else {
    delete gameData.players[socketId];
  }
};

const changeHost = () => {
  const playersId = Object.keys(gameData.players);
  const randomId = playersId[Math.floor(Math.random() * playersId.length)];
  gameData.players[randomId].host = true;
};

const startGame = () => {
  gameData.started = true;
};

io.on(ClientEvents.CONNECT, (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on(ClientEvents.JOIN_SERVER, (username) => {
    console.log(`Player joined:    ${username}`);
    addPlayer({ id: socket.id, username, host: _.isEmpty(gameData.players) });
    console.log(gameData.players);
    io.emit(ServerEvents.PLAYER_JOINED, gameData.players);
  });

  socket.on(ClientEvents.START_GAME, () => {
    console.log("Host starts the game!");
    // io.emit(ServerEvents.ROUND_STARTED, gameData.players);
  });

  socket.on(ClientEvents.DISCONNECT, () => {
    console.log(`Player left:      ${socket.id}`);
    removePlayer(socket.id);
    io.emit(ServerEvents.PLAYER_LEFT, gameData.players);
    console.log(gameData.players);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
