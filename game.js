export default class Game {
  constructor(player1Name, player2Name){
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getName(){
    return `${this.player1Name} vs. ${this.player2Name}`;
  }
}