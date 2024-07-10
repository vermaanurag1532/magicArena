let gameOver = false;

function startGame() {
  const player1 = {
    name: document.getElementById('player1-name').value,
    health: parseInt(document.getElementById('player1-health').value),
    strength: parseInt(document.getElementById('player1-strength').value),
    attack: parseInt(document.getElementById('player1-attack').value)
  };
  const player2 = {
    name: document.getElementById('player2-name').value,
    health: parseInt(document.getElementById('player2-health').value),
    strength: parseInt(document.getElementById('player2-strength').value),
    attack: parseInt(document.getElementById('player2-attack').value)
  };

  fetch('/api/arena/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ player1, player2 })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('fight-log').innerHTML = '<p>' + data.message + '</p>';
    gameOver = false;
  });
}

function fightRound() {
  if (gameOver) return;

  fetch('/api/arena/fight', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      const log = document.getElementById('fight-log');
      const result = data.result;

      log.innerHTML += `<p>${result.attacker} attacks ${result.defender}:</p>`;
      log.innerHTML += `<p>Attack Roll: ${result.attackRoll}, Attack Damage: ${result.attackDamage}</p>`;
      log.innerHTML += `<p>Defend Roll: ${result.defendRoll}, Defend Damage: ${result.defendDamage}</p>`;
      log.innerHTML += `<p>${result.defender} takes ${result.damageDealt} damage. Health is now ${result.defenderHealth}</p>`;

      if (data.gameOver) {
        log.innerHTML += `<h2>Game Over! ${data.winner} wins!</h2>`;
        gameOver = true;
      }
    });
}
