let playerNumber = 0;
let activePlayer = 0;
let rounds = 1;
let gameOver = false;

const playerData = [
  { name: "", symbol: "O" },
  { name: "", symbol: "X" },
];

const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const player1RenameButtons = document.querySelector(".rename-player1-btn");
const player2RenameButtons = document.querySelector(".rename-player2-btn");
const playerModalCancelButton = document.querySelector(
  ".player-modal-btns button"
);
const playerModalOkayButton = playerModalCancelButton.nextElementSibling;

const backDrop = document.querySelector(".backdrop");
const playerModal = document.querySelector(".player-modal");
const playerForm = document.querySelector("form");
const errorMessage = document.querySelector(".error-msg");
const startGameButton = document.getElementById("start-game-btn");
const game = document.querySelector(".game");
const gameTile = document.querySelectorAll(".game-board li");
const activePlayerName = document.querySelector(".game span");
const gameStatus = document.querySelector(".game-status");
const winnerName = document.querySelector(".winner-name");

function ClickToRename(event) {
  playerNumber = +event.target.dataset.player;
  backDrop.style.display = "block";
  playerModal.style.display = "block";
}
function CancelPlayerModal() {
  backDrop.style.display = "none";
  playerModal.style.display = "none";
  errorMessage.style.display = "none";
  playerForm.children[0].classList.remove("error-label");
  playerForm.children[1].classList.remove("error-input");
  playerForm.children[1].value = "";
}
function GetPlayerName(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const playerName = formData.get("player-name").trim();

  if (!playerName) {
    errorMessage.style.display = "block";
    event.target.children[0].classList.add("error-label");
    event.target.children[1].classList.add("error-input");
  } else {
    const updatePlayerName = document.querySelector(".player-" + playerNumber);
    updatePlayerName.children[1].textContent = playerName;
    playerData[playerNumber - 1].name = playerName;
    CancelPlayerModal();
  }
}

function ClickToStartGame() {
  if (playerData[0].name === "" || playerData[1].name === "") {
    alert("Please enter Player Names first");
    return;
  }
  game.style.display = "block";

  activePlayerName.textContent = playerData[activePlayer].name;
}

function PlayerSwitcher() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = playerData[activePlayer].name;
}

function AddSymbol(event) {
  if (gameOver === true) {
    return;
  }

  const columnTile = event.target.dataset.col - 1;
  const rowTile = event.target.dataset.row - 1;

  if (gameData[rowTile][columnTile] > 0) {
    alert("This field already taken, please select others which are not taken");
    return;
  }

  event.target.textContent = playerData[activePlayer].symbol;
  event.target.classList.add("disabled");
  gameData[rowTile][columnTile] = activePlayer + 1;
  console.log(gameData);
  let winner = GameOver();
  console.log(winner);

  if (winner !== 0) {
    GameWinner(winner);
  }

  rounds++;
  console.log(rounds);
  PlayerSwitcher();
}

player1RenameButtons.addEventListener("click", ClickToRename);
player2RenameButtons.addEventListener("click", ClickToRename);
backDrop.addEventListener("click", CancelPlayerModal);
playerModalCancelButton.addEventListener("click", CancelPlayerModal);
playerForm.addEventListener("submit", GetPlayerName);
startGameButton.addEventListener("click", ClickToStartGame);

for (const singleTile of gameTile) {
  singleTile.addEventListener("click", AddSymbol);
}

function GameOver() {
  for (i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  for (i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }
  if (rounds === 9) {
    return -1;
  }

  return 0;
}

function GameWinner(winner) {
  gameOver = true;
  gameStatus.style.display = "block";

  if (winner > 0) {
    winnerName.textContent = playerData[winner - 1].name;
  } else {
    gameStatus.firstElementChild.firstElementChild.innerHTML =
      '<p>It\'s a <span class="winner-name">Draw</span></p>';
  }
}
