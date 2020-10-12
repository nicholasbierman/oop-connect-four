export class GameJSONSerializer {
  constructor(game) {
    this.game = game;
  }

  serialize() {
    let tokenArray = [];
    let playerNames = [];
    for (let i = 0; i < 7; i++) {
      let column = [];
      for (let j = 0; j < 6; j++) {
        column.push(this.game.getTokenAt(j, i));
      }
      tokenArray.push(column);
    }
    playerNames[0] = this.game.player1Name;
    playerNames[1] = this.game.player2Name;
    let jsonString = JSON.stringify([
      tokenArray,
      playerNames,
      this.game.currentPlayer,
      this.game.winnerNumber,
    ]);
    localStorage.setItem("gameState", jsonString);
  }
}

export class GameJSONDeserializer {
  constructor() {
    this.tokenArray = [];
    this.playerNames = [];
    this.currentPlayer = "";
    this.winnerNumber = undefined;
  }

  deserialize() {
    let jsonString = localStorage.getItem("gameState");
    let object = JSON.parse(jsonString);
    if (object !== null) {
      this.tokenArray = object[0];
      this.playerNames = object[1];
      this.currentPlayer = object[2];
      this.winnerNumber = object[3];
    }
    
  }
}
