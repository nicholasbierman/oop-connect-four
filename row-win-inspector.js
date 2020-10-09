export default class RowWinInspector {
     constructor(columns) {
          this.columns = columns;
     }

     inspect() {
          for (let i = 0; i < 6; i++) {
               let token0 = this.columns[0].tokens[i];
               let token1 = this.columns[1].tokens[i];
               let token2 = this.columns[2].tokens[i];
               let token3 = this.columns[3].tokens[i];

               if ((token0 === token1) && (token1 === token2) && (token2 === token3) && (token0 !== null)) {
                    return token0;
               }
          }
          return 0;
     }
}
