export const ClientEvents = {
  CONNECT: "connection",
  DISCONNECT: "disconnect",
  JOIN_SERVER: "join-server",
  SET_MOVE: "set-move",
  START_GAME: "start-game",
  WIN: "win",
};

export const ServerEvents = {
  PLAYER_JOINED: "player-joined",
  PLAYER_LEFT: "player-left",
  PLAYER_MOVED: "player-moved",
  PLAYER_WON: "player-won",
  ROUND_STARTED: "round-started",
  ROUND_COMPLETED: "round-completed",
};
