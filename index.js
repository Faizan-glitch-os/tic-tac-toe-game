let playerNumber = 0;

const playerData = [
  { name: "", symbol: "O" },
  { name: "", symbol: "X" },
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
    return;
  } else {
    const updatePlayerName = document.querySelector(".player-" + playerNumber);
    updatePlayerName.children[1].textContent = playerName;
    playerData[playerNumber - 1].name = playerName;
    CancelPlayerModal();
  }
}

player1RenameButtons.addEventListener("click", ClickToRename);
player2RenameButtons.addEventListener("click", ClickToRename);
backDrop.addEventListener("click", CancelPlayerModal);
playerModalCancelButton.addEventListener("click", CancelPlayerModal);
playerForm.addEventListener("submit", GetPlayerName);
