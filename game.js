import ColumnWinInspector from './column-win-inspector.js';
import Column from './column.js';
import DiagonalWinInspector from './diagonal-win-inspector.js';
import RowWinInspector from './row-win-inspector.js';
export default class Game {
  constructor(player1Name, player2Name) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.currentPlayer = 1;
    this.columns = new Array(7);
    this.columnInpectors = new Array(7);
    for (let i = 0; i < 7; i++) {
      this.columns[i] = new Column();
      this.columnInpectors[i] = new ColumnWinInspector(this.columns[i]);
    }
    this.winnerNumber = 0;
  }

  getTokenAt(rowIndex, columnIndex) {
    //if(rowIndex >= this.tokens.length) return null;
    return this.columns[columnIndex].tokens[rowIndex];
  }

  playInColumn(columnIndex) {
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
    this.columns[columnIndex].add(this.currentPlayer);
    checkForTie.bind(this)();
    let result = this.columnInpectors[columnIndex].inspect();
    if(result !== 0) this.winnerNumber = result;
    this.checkForRowOrDiagonalWin();

    function checkForTie(){
      let everythingIsFull = true;
      for(let i = 0; i < this.columns.length; i++){
        if(!this.columns[i].isFull()) everythingIsFull = false;
      }
      if(everythingIsFull){
        this.winnerNumber = 3;
      }
    }
  }

  checkForRowOrDiagonalWin() {
    for (let i = 0; i < 4; i++) {
      let fourColumns = this.columns.slice(i, i + 4);
      let rowWinInspector = new RowWinInspector(fourColumns);
      let result = rowWinInspector.inspect();
      if (result === 1 || result === 2) {
        this.winnerNumber = result;
      }

      let diagonalWinInspector = new DiagonalWinInspector(fourColumns);
      result = diagonalWinInspector.inspect();
      if (result === 1 || result === 2) {
        this.winnerNumber = result;
      }
    }
  }

  getName() {
    let gameStatus = `${this.player1Name} vs. ${this.player2Name}`;
    if(this.winnerNumber === 1) {
      gameStatus = `${this.player1Name} wins!`;
    } else if(this.winnerNumber === 2){
      gameStatus = `${this.player2Name} wins!`;
    } else if(this.winnerNumber === 3){
      gameStatus = `${this.player1Name} ties with ${this.player2Name}`;
    }
    return gameStatus;
  }

  isColumnFull(columnIndex) {
    let result = this.columns[columnIndex].isFull();
    if(this.winnerNumber === 1 || this.winnerNumber === 2){
      result = true;
    }

    return result;
  }

  restoreSavedTokens(savedTokens){
    for(let i = 0; i < savedTokens.length; i++){
      this.columns[i].tokens = savedTokens[i];
    }
  }
}
