const express = require("express");
const http = require("http");
const cors = require("cors");
const util = require("util");
const { Server } = require("socket.io");
const { ClientEvents, ServerEvents } = require("./events");
const _ = require("lodash");
const { startGame, endGame, restartGame } = require("./game");
const {
  addPlayer,
  movePlayer,
  removePlayer,
  defaultPositions,
} = require("./players");

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
  winner: null,
};

let connections = 0;

io.on(ClientEvents.CONNECT, (socket) => {
  console.log(`[SOCKET] Client connected: ${socket.id}`);
  connections += 1;

  socket.on(ClientEvents.JOIN_SERVER, (username) => {
    console.log(`[INFO] Player joined: ${username}`);
    addPlayer(gameData, {
      id: socket.id,
      username,
      host: _.isEmpty(gameData.players),
      startPosition: defaultPositions[connections - 1],
    });
    io.emit(ServerEvents.PLAYER_JOINED, gameData.players);
  });

  socket.on(ClientEvents.START_GAME, () => {
    console.log("[INFO] Host starts the game!");
    startGame(gameData);
    io.emit(ServerEvents.ROUND_STARTED, gameData);
  });

  socket.on(ClientEvents.SET_MOVE, (position) => {
    movePlayer(gameData, socket.id, _.values(position));
    socket.broadcast.emit(ServerEvents.PLAYER_MOVED, gameData.players);
  });

  socket.on(ClientEvents.WIN, (id) => {
    if (!gameData.winner && id) {
      console.log(`[INFO] Player with id ${id} won the game!`);
      io.emit(ServerEvents.PLAYER_WON, gameData.players[id]);
      endGame(gameData, id);
    }
  });

  socket.on(ClientEvents.DISCONNECT, () => {
    console.log(`[SOCKET] Client left: ${socket.id}`);
    connections -= 1;
    removePlayer(gameData, socket.id);
    io.emit(ServerEvents.PLAYER_LEFT, gameData.players);
  });
});

server.listen(PORT, () => {
  console.log(`[SERVER] Running on port ${PORT}`);
});
