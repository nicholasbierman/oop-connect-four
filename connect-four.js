import Column from "./colum.js";
import Game from "./game.js";

let game = undefined;
let boardHolder = document.getElementById("board-holder");
let gameNameDiv = document.getElementById("game-name");
let clickTargets = document.getElementById("click-targets");
let columns = new Array(7);
function updateUI() {
  if (game === undefined) {
    boardHolder.classList.add("is-invisible");
  } else {
    boardHolder.classList.remove("is-invisible");
    gameNameDiv.innerHTML = game.getName();
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
    for (let j = 0; j < 6; j++) {
      let token = columns[i].getTokenAt(j);
      let cssClass = "";
      if (token === 1) {
        cssClass = "red";
      } else if (token === 2) {
        cssClass = "black";
      }
      let div = document.getElementById(`square-${j}-${i}`);
      if (cssClass !== '') {
        div.classList.add(cssClass);
      }
    }
  }
}
window.addEventListener("DOMContentLoaded", (event) => {
  let player1Content = document.getElementById("player-1-name");
  let player2Content = document.getElementById("player-2-name");
  let newGameButton = document.getElementById("new-game");
  for (let i = 0; i < 7; i++) {
    columns[i] = new Column();
  }

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
    player1Content.value = "";
    player2Content.value = "";
    enableNewGameButton();
    updateUI();
  });

  clickTargets.addEventListener("click", (event) => {
    let columnIndex = event.target.id.split("-")[1];
    game.playInColumn(columnIndex);
    columns[columnIndex].add(game.currentPlayer);
    updateUI();
  });
});
