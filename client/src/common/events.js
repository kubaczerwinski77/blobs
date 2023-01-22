export const ClientEvents = {
  CONNECT: "connection",
  DISCONNECT: "disconnect",
  JOIN_SERVER: "join-server",
  SET_MOVE: "set-move",
  START_GAME: "start-game",
};

export const ServerEvents = {
  PLAYER_JOINED: "player-joined",
  PLAYER_LEFT: "player-left",
  PLAYER_MOVED: "player-moved",
  ROUND_STARTED: "round-started",
  ROUND_COMPLETED: "round-completed",
  WIN: "win",
};
