export default class ColumnWinInspector {
     constructor(column) {
          this.column = column;
     }

     inspect() {
          for (let i = 0; i < this.column.tokens.length - 3; i++) {
               let tokeni = this.column.tokens[i];
               let result =  true;
               for(let j = i+1; j < i+4; j++){
                    if(tokeni !== this.column.tokens[j]){
                         result = false;
                         break;
                    }
               }
               if(result && tokeni !== null) return tokeni;
          }
          return 0;
     }
}
