/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  //set "board" to empty HEIGHT x WIDTH matrix array
 for (let y = 0; y < HEIGHT; y ++){
  board.push(Array.from({length: WIDTH}));
 }
} //DATA SOURCE

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  let htmlBoard = document.querySelector('#board');
  // get "htmlBoard" variable from the item in HTML w/ID of "board"

  // create top row of table
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top"); //give the row ID of column-top
  top.addEventListener("click", handleClick); //add click event listener to top row

  //loop over width of table, and create a table cell for each
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    //give each head cell an id of x, which is the index number
    headCell.setAttribute("id", x);
    //append each cell to the top row
    top.append(headCell);
  }
  //append the top row to the board 
  htmlBoard.append(top);

  // loop over the length of the 'height' and create a row for each
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    //loop over the length of 'width' and create a table data cell for each
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      //give each cell an id of its y/x position. y increases as it goes down table, x increases to the right
      cell.setAttribute("id", `${y}-${x}`);
      //append the cells to each row created by above 'y' loop
      row.append(cell);
    }
    //append the rows to the board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  //loop over height
  for (let y = HEIGHT - 1; y >= 0; y--) {
    //if there is not already a value in board at y,x position, return that y
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  let piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  let place = document.getElementById(`${y}-${x}`)
  place.append(piece);


}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
  //reset game board after a win
 location.reload(); 
  
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id);

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    //added delay so that winning 4th piece is visible before endgame is called
    setTimeout(() =>{
      return endGame(`Player ${currPlayer} won!`);
    });  
  }

  // check for tie
  if (board.every(row => row.every(cell => cell))) {
    return endGame("It's a TIE!!!");
  }
 
  // switch players
  //since delay was added, had to make sure player wasnt switched when a win occured
  if (!checkForWin()){
    currPlayer = currPlayer === 1 ? 2 : 1;
  }
  

  const playerText = document.querySelector('#player')

  if (currPlayer === 2) {
    playerText.setAttribute('class', 'turn2');
    playerText.innerText = 'Player 2 Turn';
  } else {
    playerText.setAttribute('class', 'turn1');
    playerText.innerText = 'Player 1 Turn';
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 && //put in its own conditional
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  

  for (let y = 0; y < HEIGHT; y++) { //loop over height of board
    for (let x = 0; x < WIDTH; x++) { //loop over width for each height level
      //create 4 possible win patterns/directions (with coords that would replicate those in board variable)
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //invoke win() to see if any of above patterns match a single player, and are working coordinates
      //if any are true, winnder is declared
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
