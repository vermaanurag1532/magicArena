class Player {
    constructor(name, health, strength, attack) {
      this.name = name;
      this.health = health;
      this.strength = strength;
      this.attack = attack;
    }
  
    isAlive() {
      return this.health > 0;
    }
  
    rollDice() {
      return Math.floor(Math.random() * 6) + 1;
    }
  
    takeDamage(damage) {
      this.health -= damage;
      if (this.health < 0) this.health = 0;
    }
  }
  
  class Arena {
    constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
      this.currentAttacker = player1.health < player2.health ? player1 : player2;
      this.currentDefender = player1.health < player2.health ? player2 : player1;
    }
  
    fightRound() {
      const attackRoll = this.currentAttacker.rollDice();
      const defendRoll = this.currentDefender.rollDice();
  
      const attackDamage = this.currentAttacker.attack * attackRoll;
      const defendDamage = this.currentDefender.strength * defendRoll;
  
      const damageDealt = Math.max(0, attackDamage - defendDamage);
      this.currentDefender.takeDamage(damageDealt);
  
      const result = {
        attacker: this.currentAttacker.name,
        defender: this.currentDefender.name,
        attackRoll,
        defendRoll,
        attackDamage,
        defendDamage,
        damageDealt,
        defenderHealth: this.currentDefender.health,
      };
  
      // Switch roles
      [this.currentAttacker, this.currentDefender] = [this.currentDefender, this.currentAttacker];
  
      return result;
    }
  
    isGameOver() {
      return !this.player1.isAlive() || !this.player2.isAlive();
    }
  
    getWinner() {
      if (!this.player1.isAlive()) return this.player2.name;
      if (!this.player2.isAlive()) return this.player1.name;
      return null;
    }
  }
  
  module.exports = { Player, Arena };
  