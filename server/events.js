exports.ClientEvents = {
  CONNECT: "connection",
  DISCONNECT: "disconnect",
  JOIN_SERVER: "join-server",
  SET_MOVE: "set-move",
};

exports.ServerEvents = {
  PLAYER_JOINED: "player-joined",
  PLAYER_LEFT: "player-left",
  ROUND_STARTED: "round-started",
  ROUND_COMPLETED: "round-completed",
  WIN: "win",
};
