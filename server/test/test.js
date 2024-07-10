const assert = require('assert');
const { Player, Arena } = require('../models/arena');

describe('Player', function () {
  it('should create a player with correct attributes', function () {
    const player = new Player('Alice', 50, 5, 10);
    assert.strictEqual(player.name, 'Alice');
    assert.strictEqual(player.health, 50);
    assert.strictEqual(player.strength, 5);
    assert.strictEqual(player.attack, 10);
  });

  it('should reduce health correctly when taking damage', function () {
    const player = new Player('Alice', 50, 5, 10);
    player.takeDamage(20);
    assert.strictEqual(player.health, 30);
    player.takeDamage(40);
    assert.strictEqual(player.health, 0);
  });
});

describe('Arena', function () {
  it('should determine the correct starting attacker', function () {
    const player1 = new Player('Alice', 50, 5, 10);
    const player2 = new Player('Bob', 100, 10, 5);
    const arena = new Arena(player1, player2);
    assert.strictEqual(arena.currentAttacker.name, 'Alice');
  });

  it('should switch roles after each round', function () {
    const player1 = new Player('Alice', 50, 5, 10);
    const player2 = new Player('Bob', 100, 10, 5);
    const arena = new Arena(player1, player2);
    arena.fightRound();
    assert.strictEqual(arena.currentAttacker.name, 'Bob');
  });
});
