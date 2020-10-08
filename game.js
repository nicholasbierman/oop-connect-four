import Column from './column.js';
export default class Game {
  constructor(player1Name, player2Name) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.currentPlayer = 1;
    this.columns = new Array(7);
    for (let i = 0; i < 7; i++) {
      this.columns[i] = new Column();
    }
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

  }

  getName() {
    return `${this.player1Name} vs. ${this.player2Name}`;
  }

  isColumnFull(columnIndex) {
    return this.columns[columnIndex].isFull();
  }
}
