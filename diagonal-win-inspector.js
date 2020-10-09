export default class DiagonalWinInspector {
  constructor(columns){
    this.columns = columns;
  }
  inspect() {
    for (let i = 0; i < 3; i++) {
         let token0 = this.columns[0].tokens[i];
         let token1 = this.columns[1].tokens[i+1];
         let token2 = this.columns[2].tokens[i+2];
         let token3 = this.columns[3].tokens[i+3];

         if ((token0 === token1) && (token1 === token2) && (token2 === token3) && (token0 !== null)) {
              return token0;
         }
         token0 = this.columns[0].tokens[i+3];
         token1 = this.columns[1].tokens[i+2];
         token2 = this.columns[2].tokens[i+1];
         token3 = this.columns[3].tokens[i];

         if ((token0 === token1) && (token1 === token2) && (token2 === token3) && (token0 !== null)) {
              return token0;
         }

    }
    return 0;
  }
}  
