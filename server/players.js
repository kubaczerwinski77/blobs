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
  gameData.players[socketId] = {
    ...gameData.players[socketId],
    position: newPosition,
  };
};
