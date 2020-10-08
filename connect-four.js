import Game from './game.js';

let game = undefined;
let boardHolder = document.getElementById('board-holder');
let gameNameDiv = document.getElementById('game-name');
function updateUI(){
  if(game === undefined){
    boardHolder.classList.add('is-invisible');
  } else {
    boardHolder.classList.remove('is-invisble');
    gameNameDiv.innerHTML = game.getName();
  }
}
window.addEventListener('DOMContentLoaded', event => {
  let player1Content = document.getElementById('player-1-name');
  let player2Content = document.getElementById('player-2-name');
  let newGameButton = document.getElementById('new-game');

  function enableNewGameButton(){
    if(player1Content.value !== '' && player2Content.value !== ''){
      newGameButton.disabled = false;
    } else {
      newGameButton.disabled = true;
    }
  }
  player1Content.addEventListener('keyup', evt => {
    enableNewGameButton();
  });
  player2Content.addEventListener('keyup', evt => {
    enableNewGameButton();
  });

  newGameButton.addEventListener('click', event => {
    game = new Game(player1Content.value, player2Content.value);
    player1Content.value = '';
    player2Content.value = '';
    enableNewGameButton();
    updateUI();
  })
});