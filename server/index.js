const express = require("express");
const http = require("http");
const cors = require("cors");
const util = require("util");
const { Server } = require("socket.io");
const { ClientEvents, ServerEvents } = require("./events");
const _ = require("lodash");
const { startGame, endGame } = require("./game");
const { addPlayer, movePlayer, removePlayer } = require("./players");

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

io.on(ClientEvents.CONNECT, (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on(ClientEvents.JOIN_SERVER, (username) => {
    console.log(`Player joined:    ${username}`);
    addPlayer(gameData, {
      id: socket.id,
      username,
      host: _.isEmpty(gameData.players),
    });
    console.log(
      util.inspect(gameData.players, {
        showHidden: true,
        depth: null,
        colors: true,
      })
    );
    io.emit(ServerEvents.PLAYER_JOINED, gameData.players);
  });

  socket.on(ClientEvents.START_GAME, () => {
    console.log("Host starts the game!");
    startGame(gameData);
    io.emit(ServerEvents.ROUND_STARTED, gameData);
  });

  socket.on(ClientEvents.SET_MOVE, (position) => {
    movePlayer(gameData, socket.id, _.values(position));
    socket.broadcast.emit(ServerEvents.PLAYER_MOVED, gameData.players);
  });

  socket.on(ClientEvents.WIN, (id) => {
    console.log("Game is ended, the winner is", id);
    if (!gameData.winner) {
      io.emit(ServerEvents.PLAYER_WON, gameData.players[id]);
    }
    endGame(gameData, id);
  });

  socket.on(ClientEvents.DISCONNECT, () => {
    console.log(`Player left:      ${socket.id}`);
    removePlayer(gameData, socket.id);
    io.emit(ServerEvents.PLAYER_LEFT, gameData.players);
    console.log(gameData.players);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
