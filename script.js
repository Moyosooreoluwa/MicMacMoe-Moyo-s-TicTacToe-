var gameBoard;
const player = "X";
const computer = "O";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const cells = document.querySelectorAll(".cell");
startGameH();

function startGameH() {
  document.querySelector(".end").style.display = "none";
  gameBoard = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClickH, false);
  }
}

function startGameE() {
  document.querySelector(".end").style.display = "none";
  gameBoard = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClickE, false);
  }
}

function turnClickH(square) {
  if (typeof gameBoard[square.target.id] == "number") {
    turnH(square.target.id, player);
    if (!checkDrawH()) turnH(nextBestSpotH(), computer);
  }
}

function turnClickE(square) {
  if (typeof gameBoard[square.target.id] == "number") {
    turnE(square.target.id, player);
    if (!checkDrawE()) turnE(nextBestSpotE(), computer);
  }
}

function turnH(squareId, whoPlayed) {
  gameBoard[squareId] = whoPlayed;
  document.getElementById(squareId).innerText = whoPlayed;
  let gameWon = checkWin(gameBoard, whoPlayed);
  if (gameWon) gameOverH(gameWon);
}

function turnE(squareId, whoPlayed) {
  gameBoard[squareId] = whoPlayed;
  document.getElementById(squareId).innerText = whoPlayed;
  let gameWon = checkWin(gameBoard, whoPlayed);
  if (gameWon) gameOverE(gameWon);
}

function checkWin(board, whoPlayed) {
  let plays = board.reduce(
    (a, e, i) => (e === whoPlayed ? a.concat(i) : a),
    []
  );
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, whoPlayed: whoPlayed };
      break;
    }
  }
  return gameWon;
}

function gameOverH(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.whoPlayed == player ? "#A6CF98" : "#FF9999";
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClickH, false);
  }
  declareWinner(gameWon.whoPlayed == player ? "You win! =)" : "You lose. =(");
}

function gameOverE(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.whoPlayed == player ? "#A6CF98" : "#FF9999";
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClickE, false);
  }
  declareWinner(gameWon.whoPlayed == player ? "You win! =)" : "You lose. =(");
}

function declareWinner(who) {
  document.querySelector(".end").style.display = "block";
  document.querySelector(".end .text").innerText = who;
}

function emptySquares() {
  return gameBoard.filter((s) => typeof s == "number");
}

function nextBestSpotH() {
   return minimax(gameBoard, computer).index;
    // return emptySquares()[0]
}

function nextBestSpotE() {
  // return minimax(gameBoard, computer).index;
   return emptySquares()[0]
}

function checkDrawH() {
  if (emptySquares().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "#BFBFBF";
      cells[i].removeEventListener("click", turnClickH, false);
    }
    declareWinner("DRAW!");
    return true;
  }
  return false;
}

function checkDrawE() {
  if (emptySquares().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "#BFBFBF";
      cells[i].removeEventListener("click", turnClickE, false);
    }
    declareWinner("DRAW!");
    return true;
  }
  return false;
}


function minimax(newBoard, whoPlayed) {
  var availSpots = emptySquares();

  if (checkWin(newBoard, player)) {
    return { score: -10 };
  } else if (checkWin(newBoard, computer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = whoPlayed;

    if (whoPlayed == computer) {
      var result = minimax(newBoard, player);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, computer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (whoPlayed === computer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
