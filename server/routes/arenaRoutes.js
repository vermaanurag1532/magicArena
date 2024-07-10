const express = require('express');
const { startGame, fightRound } = require('../controllers/arenaController');

const router = express.Router();

router.post('/start', startGame);
router.post('/fight', fightRound);

module.exports = router;
