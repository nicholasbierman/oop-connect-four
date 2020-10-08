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

    function checkForTie(){
      let everythingIsFull = true;
      for(let i = 0; i < this.columns.length; i++){
        if(!this.columns[i].isFull()) everythingIsFull = false;
      }
      //if(this.columns.every(ele => {ele.isFull()})){
      if(everythingIsFull){
        console.log(`${this.player1Name} ties with ${this.player2Name}`);
        alert(`${this.player1Name} ties with ${this.player2Name}`);
        this.winnerNumber = 3;
      }
    }
  }

  getName() {
    return `${this.player1Name} vs. ${this.player2Name}`;
  }

  isColumnFull(columnIndex) {
    return this.columns[columnIndex].isFull();
  }
}
