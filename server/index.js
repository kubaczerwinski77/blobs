const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
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

let players = {};

const addPlayer = (id) => {
  players = {
    ...players,
    [id]: {
      id,
      position: [undefined, undefined, undefined],
      rotation: [undefined, undefined, undefined],
    },
  };
};

const removePlayer = (id) => {
  delete players[id];
};

const updatePlayerPositon = (id, position, rotation) => {
  players = {
    ...players,
    [id]: {
      ...players.id,
      position,
      rotation,
    },
  };
};

io.on("connection", (socket) => {
  addPlayer(socket.id);

  socket.emit("player_joined", {
    players,
  });

  socket.on("position_change", (payload) => {
    // console.log(`Player ${payload.id} changed position ${payload.pos}`);
    updatePlayerPositon(payload.id, payload.pos, payload.rot);
    socket.broadcast.emit("players_changed", { players });
  });

  socket.on("disconnect", () => {
    removePlayer(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
