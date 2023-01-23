exports.startGame = (gameData) => {
  gameData.started = true;
  gameData.winner = null;
};

exports.endGame = (gameData, winner) => {
  gameData.started = false;
  gameData.winner = winner;
};
