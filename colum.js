export default class Column {
  constructor(){
    this.tokens = [null, null, null, null, null, null];
  }

  add(currentPlayer) {
    for(let i = 5; i >= 0; i--){
      if(this.tokens[i] === null){
        this.tokens[i] = currentPlayer;
        return;
      }
    }
  }
  // returns null, 1 or 2
  getTokenAt(rowIndex){
    //if(rowIndex >= this.tokens.length) return null;
    return this.tokens[rowIndex];
  }
}
