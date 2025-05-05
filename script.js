const size = 5;
let board = [];

function createBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  board = [];

  for (let row = 0; row < size; row++) {
    const rowArr = [];
    for (let col = 0; col < size; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", () => toggleCell(row, col, true));
      boardElement.appendChild(cell);
      rowArr.push(cell);
    }
    board.push(rowArr);
  }

  for (let i = 0; i < 10; i++) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    toggleCell(r, c, false);
  }
}

function toggleCell(row, col, checkWin = true) {
  const positions = [
    [row, col],
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1]
  ];

  positions.forEach(([r, c]) => {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      board[r][c].classList.toggle("is-off");
    }
  });

  if (checkWin && checkVictory()) {
    showVictoryPopup();
  }
}

function checkVictory() {
  const allOff = board.flat().every(cell => cell.classList.contains("is-off"));
  const allOn = board.flat().every(cell => !cell.classList.contains("is-off"));
  return allOff || allOn;
}

function resetGame() {
  createBoard();
}

function showStatus() {
  const offCount = board.flat().filter(cell => cell.classList.contains("is-off")).length;
  const total = size * size;
  if (offCount === total) {
    alert("All Off 🟢");
    showVictoryPopup();
  } else if (offCount === 0) {
    alert("All On 🔴");
    showVictoryPopup();
  } else {
    alert(`${offCount} lights are off. ${total - offCount} are on.`);
  }
}

function showVictoryPopup() {
  const popup = document.getElementById("victory-popup");
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 2000);
}

window.onload = () => {
  createBoard();
};
