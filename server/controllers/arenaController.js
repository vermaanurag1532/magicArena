const { Player, Arena } = require('../models/arena');

let arena;

const startGame = (req, res) => {
  const { player1, player2 } = req.body;
  const p1 = new Player(player1.name, player1.health, player1.strength, player1.attack);
  const p2 = new Player(player2.name, player2.health, player2.strength, player2.attack);
  arena = new Arena(p1, p2);
  res.send({ message: 'Game started!' });
};

const fightRound = (req, res) => {
  if (!arena) return res.status(400).send({ message: 'Game not started' });

  const result = arena.fightRound();
  const gameOver = arena.isGameOver();
  const winner = gameOver ? arena.getWinner() : null;

  res.send({ result, gameOver, winner });
};

module.exports = { startGame, fightRound };
