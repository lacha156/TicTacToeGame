
 

const gameDisplay = document.querySelector('.game--status');
let gameIsLive = true;
let currentPlayer = "X"; // Will help us keep track of who is current player. 
let playersMoves = ["", "", "", "", "", "", "", "", ""]; // an array of empty strings, allows us to store each players moves.
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const cells = document.querySelectorAll('.cell') // gets all cell elements
const restartGame = document.querySelector('.restart').addEventListener('click', playAgain);

cells.forEach(cell =>{
    cell.addEventListener('click', handleCellClick) // adds an event listner when cell is clicked. 
})

gameDisplay.innerHTML= currentPlayerTurn() // displays current players turn on H2

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target; //
  const clickedCellIndex = parseInt(clickedCell.getAttribute('Id')) // get id and changing string to number.
  
  
if(playersMoves[clickedCellIndex] !== "" || !gameIsLive){
    return;
    }
    handleCellPlayed(clickedCell,clickedCellIndex);
    checkWinner();
}

function handleCellPlayed(clickedCell,clickedCellIndex){
    playersMoves[clickedCellIndex] = currentPlayer; // adds chosen cell to array. 
    clickedCell.innerHTML = currentPlayer; // updates webpage with user selection.
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function checkWinner() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) { // Loop to go through winning combinations
        const winCombos = winningCombos[i];
        let a = playersMoves[winCombos[0]];
        let b = playersMoves[winCombos[1]];
        let c = playersMoves[winCombos[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
        gameDisplay.innerHTML = `${currentPlayer} has won!`;
        gameIsLive = false;
        return;
    }
    let draw = !playersMoves.includes(""); // determines if its a draw by checking if playersMoves has an empty string available.
    if (draw) {
        gameDisplay.innerHTML = `Tie Game :(`;
        gameIsLive = false;
        return;
    }
    playerChange()
}

function playerChange(){ // switching from X and O. displaying the change on H2
    currentPlayer = currentPlayer === "X" ? "O" :"X"
    gameDisplay.innerHTML = currentPlayerTurn();
}

function playAgain() { // resetting game, playerMoves goes back to blank, current player goes back to x
    gameIsLive = true;
    currentPlayer = "X";
    playersMoves = ["", "", "", "", "", "", "", "", ""];
    gameDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}




