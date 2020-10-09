import Game from "./game.js";

let game = undefined;
let boardHolder = document.getElementById("board-holder");
let gameNameDiv = document.getElementById("game-name");
let clickTargets = document.getElementById("click-targets");
let newGameJustStarted = false;
let columnToAnimate;
let timeUnit = 200;
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
    let rowToAnimate = 6;
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
          if(i === columnToAnimate && j < rowToAnimate){
            animateDrop(j, i, cssClass);
            rowToAnimate = j;
          }
          setTimeout(addCSSClass, j * timeUnit, div, cssClass);
        }
      }
    }
  }
  gameNameDiv.innerHTML = game.getName();

  function addCSSClass(el, cssClass){
    el.classList.add(cssClass);
  }
  function removeCSSClass(el, cssClass){
    el.classList.remove(cssClass);
  }
  function animateDrop(rowIndex, columnIndex, cssClass){   
    for(let i = 0; i < rowIndex; i++){
      let div =  document.getElementById(`square-${i}-${columnIndex}`);
      let waitTime = i * timeUnit;
      setTimeout(addCSSClass, waitTime, div, cssClass);
      setTimeout(removeCSSClass, waitTime + timeUnit, div, cssClass);
    }
  }
}

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
    let columnIndex = Number(event.target.id.split("-")[1]);
    columnToAnimate = columnIndex;
    if (game.isColumnFull(columnIndex)) {
      event.target.classList.add("full");
    } else {
      game.playInColumn(columnIndex);
      event.target.classList.remove("full");
    }
    updateUI();
  });
});
