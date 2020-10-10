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

  isFull(){
    return this.tokens.every(ele => ele !== null);
  }
}
