const playerRenameButtons = document.querySelectorAll(".rename-player1-btn");
const playerModalCancelButton = document.querySelector(
  ".player-modal-btns button"
);
const playerModalOkayButton = playerModalCancelButton.nextElementSibling;

const backDrop = document.querySelector(".backdrop");
const playerModal = document.querySelector(".player-modal");
const playerForm = document.querySelector("form");
const errorMessage = document.querySelector(".error-msg");

function ClickToRename() {
  backDrop.style.display = "block";
  playerModal.style.display = "block";
}
function CancelPlayerModal() {
  backDrop.style.display = "none";
  playerModal.style.display = "none";
  errorMessage.style.display = "none";
  playerForm.children[0].classList.remove("error-label");
  playerForm.children[1].classList.remove("error-input");
}
function GetPlayerName(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const playerName = formData.get("player-name").trim();
  console.log(playerName);
  console.dir(event.target);

  if (!playerName) {
    errorMessage.style.display = "block";
    event.target.children[0].classList.add("error-label");
    event.target.children[1].classList.add("error-input");
    return;
  }
}

playerRenameButtons[0].addEventListener("click", ClickToRename);
playerRenameButtons[1].addEventListener("click", ClickToRename);
backDrop.addEventListener("click", CancelPlayerModal);
playerModalCancelButton.addEventListener("click", CancelPlayerModal);
playerForm.addEventListener("submit", GetPlayerName);
