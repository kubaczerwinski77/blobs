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

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
