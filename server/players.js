const _ = require("lodash");

changeHost = (gameData) => {
  const playersId = Object.keys(gameData.players);

  if (playersId.length === 0) {
    return;
  }

  const randomId = playersId[Math.floor(Math.random() * playersId.length)];
  gameData.players[randomId].host = true;
};

exports.addPlayer = (gameData, player) => {
  gameData.players = {
    ...gameData.players,
    [player.id]: {
      id: player.id,
      username: player.username,
      host: player.host,
      startPosition: player.startPosition,
    },
  };
};

exports.removePlayer = (gameData, socketId) => {
  if (gameData.players[socketId] && gameData.players[socketId].host) {
    delete gameData.players[socketId];
    changeHost(gameData);
  } else {
    delete gameData.players[socketId];
  }
};

exports.movePlayer = (gameData, socketId, newPosition) => {
  if (_.has(gameData.players, socketId)) {
    gameData.players[socketId] = {
      ...gameData.players[socketId],
      position: newPosition,
    };
  }
};

exports.defaultPositions = [
  [-4, 0.5, -2],
  [-3, 0.5, -2],
  [-4, 0.5, -1],
  [-3, 0.5, -1],
];
