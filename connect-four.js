import Game from "./game.js";

let game = undefined;
let boardHolder = document.getElementById("board-holder");
let gameNameDiv = document.getElementById("game-name");
let clickTargets = document.getElementById("click-targets");
let newGameJustStarted = false;
function updateUI() {
  if (game === undefined) {
    boardHolder.classList.add("is-invisible");
  } else {
    boardHolder.classList.remove("is-invisible");
    // gameNameDiv.innerHTML = game.getName();
  }
  let currentPlayer = game.currentPlayer;
  if (currentPlayer === 1) {
    clickTargets.classList.add("black");
    clickTargets.classList.remove("red");
  } else {
    clickTargets.classList.add("red");
    clickTargets.classList.remove("black");
  }
  for (let i = 0; i < 7; i++) {
    // if (game.isColumnFull(i)) {
    //   clickTargets.classList.add("full");
    // } else {
    for (let j = 0; j < 6; j++) {
      let token = game.getTokenAt(j, i);
      let cssClass = "";
      if (token === 1) {
        cssClass = "red";
      } else if (token === 2) {
        cssClass = "black";
      }
      let div = document.getElementById(`square-${j}-${i}`);
      if (newGameJustStarted) {
        div.className = "token-square";
      } else {
        if (cssClass !== "") {
          //animateDrop(div);
          //div.classList.add(cssClass);
          animateDrop(j, i, cssClass);
          setTimeout(addCSSClass, 2000, div, cssClass);
        }
      }
    }
  }
  gameNameDiv.innerHTML = game.getName();

  function addCSSClass(el, cssClass){
    el.classList.add(cssClass);
  }
  function removeCSSClass(el, cssClass){
    el.classList.add(cssClass);
  }
  function animateDrop(columnIndex, rowIndex, cssClass){   
    let timeUnit = 200;
    for(let i = 0; i < rowIndex; i++){
      let div =  document.getElementById(`square-${columnIndex}-${i}`);
      let waitTime = i * timeUnit;
      setTimeout(addCSSClass, div, waitTime, cssClass);
      setTimeout(removeCSSClass, div, waitTime + timeUnit, cssClass);
    }
  }
}
//   function animateDrop(el){
//     el.classList.add("red");
//     function makeTransition() {
//       el.classList.remove("top");
//       el.classList.add("bottom");      
//     }
//     window.setTimeout(makeTransition, 10);    
//   }
// }
window.addEventListener("DOMContentLoaded", (event) => {
  let player1Content = document.getElementById("player-1-name");
  let player2Content = document.getElementById("player-2-name");
  let newGameButton = document.getElementById("new-game");

  function enableNewGameButton() {
    if (player1Content.value !== "" && player2Content.value !== "") {
      newGameButton.disabled = false;
    } else {
      newGameButton.disabled = true;
    }
  }
  player1Content.addEventListener("keyup", (evt) => {
    enableNewGameButton();
  });
  player2Content.addEventListener("keyup", (evt) => {
    enableNewGameButton();
  });

  newGameButton.addEventListener("click", (event) => {
    game = new Game(player1Content.value, player2Content.value);
    newGameJustStarted = true;
    player1Content.value = "";
    player2Content.value = "";
    enableNewGameButton();
    updateUI();
    newGameJustStarted = false;
  });

  clickTargets.addEventListener("click", (event) => {
    let columnIndex = event.target.id.split("-")[1];
    //console.log(columnIndex);
    if (game.isColumnFull(columnIndex)) {
      event.target.classList.add("full");
    } else {
      game.playInColumn(columnIndex);
      event.target.classList.remove("full");
    }
    updateUI();
  });
});
