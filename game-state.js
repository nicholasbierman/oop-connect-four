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
    let jsonString = "";
    jsonString = JSON.stringify([
      tokenArray,
      playerNames,
      this.game.currentPlayer,
      this.game.winnerNumber,
    ]);
    localStorage.setItem("gameStatus", jsonString);
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
    let jsonString = localStorage.getItem("gameStatus");
    let object = JSON.parse(jsonString);
    if (object !== null) {
      console.log(object);
      this.tokenArray = object.tokenArray;
      this.playerNames = object.playerNames;
      this.currentPlayer = object.currentPlayer;
      this.winnerNumber = object.winnerNumber;
    }
    
  }
}
