import Game from "./game.js";
import { GameJSONSerializer, GameJSONDeserializer } from "./game-state.js";

let game = undefined;
let boardHolder = document.getElementById("board-holder");
let gameNameDiv = document.getElementById("game-name");
let clickTargets = document.getElementById("click-targets");
let newGameJustStarted = false;
let gameIsRestoredFromLocalStoraged = false;
let columnToAnimate;
let timeUnit = 200;

function updateUI() {
  if (game === undefined || game.player1Name === "") {
    boardHolder.classList.add("is-invisible");
  } else {
    boardHolder.classList.remove("is-invisible");
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
          if(gameIsRestoredFromLocalStoraged){
            addCSSClass(div, cssClass);
          } else {
            if (i === columnToAnimate && j < rowToAnimate) {
              animateDrop(j, i, cssClass);
              rowToAnimate = j;
            }
            setTimeout(addCSSClass, j * timeUnit, div, cssClass);
          }
        }
      }
    }
  }
  gameNameDiv.innerHTML = game.getName();
  if(gameNameDiv.innerHTML !== `${game.player1Name} vs. ${game.player2Name}`)
  {
    setTimeout(alert, 1000, gameNameDiv.innerHTML);
  }


  function addCSSClass(el, cssClass) {
    el.classList.add(cssClass);
  }
  function removeCSSClass(el, cssClass) {
    el.classList.remove(cssClass);
  }
  function animateDrop(rowIndex, columnIndex, cssClass) {
    for (let i = 0; i < rowIndex; i++) {
      let div = document.getElementById(`square-${i}-${columnIndex}`);
      let waitTime = i * timeUnit;
      setTimeout(addCSSClass, waitTime, div, cssClass);
      setTimeout(removeCSSClass, waitTime + timeUnit, div, cssClass);
    }
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  let gameJsonDeserializer = new GameJSONDeserializer();
  gameJsonDeserializer.deserialize();
  let player1Content = document.getElementById("player-1-name");
  let player2Content = document.getElementById("player-2-name");
  let newGameButton = document.getElementById("new-game");
  if(gameJsonDeserializer.winnerNumber !== undefined && gameJsonDeserializer.winnerNumber === 0){
    gameIsRestoredFromLocalStoraged = true;
    startGame();
    gameIsRestoredFromLocalStoraged = false;
  }

  function checkToEnableOrDisableNewGameButton() {
    if (player1Content.value !== "" && player2Content.value !== "") {
      newGameButton.disabled = false;
    } else {
      newGameButton.disabled = true;
    }
  }
  player1Content.addEventListener("keyup", (evt) => {
    checkToEnableOrDisableNewGameButton();
  });
  player2Content.addEventListener("keyup", (evt) => {
    checkToEnableOrDisableNewGameButton();
  });
  

  function startGame(){
    game = new Game(player1Content.value, player2Content.value);
    if(!newGameJustStarted){
      if (gameJsonDeserializer !== null && gameJsonDeserializer !== undefined && (gameJsonDeserializer.playerNames !== undefined)) {
        if(gameJsonDeserializer.winnerNumber === 0){ //only restore the game if no winner or not a tie
          game.restoreSavedTokens(gameJsonDeserializer.tokenArray);
          game.player1Name = gameJsonDeserializer.playerNames[0];
          game.player2Name = gameJsonDeserializer.playerNames[1];
          game.currentPlayer = gameJsonDeserializer.currentPlayer;
          game.winnerNumber = gameJsonDeserializer.winnerNumber;
        }
      }
    }

    player1Content.value = "";
    player2Content.value = "";
    checkToEnableOrDisableNewGameButton();
    updateUI();
  }
  newGameButton.addEventListener("click", (event) => {
    newGameJustStarted = true;
    startGame(true);
    newGameJustStarted = false;    
  });

  clickTargets.addEventListener("click", (event) => {
    let columnIndex = Number(event.target.id.split("-")[1]);
    if(columnIndex >= 0 && columnIndex <= 6){
      columnToAnimate = columnIndex;
      if (game.isColumnFull(columnIndex)) {
        event.target.classList.add("full");
      } else {
        game.playInColumn(columnIndex);
        event.target.classList.remove("full");
      }
    }
    updateUI();
    let gameJsonSerializer = new GameJSONSerializer(game);
    gameJsonSerializer.serialize();
  });
});
