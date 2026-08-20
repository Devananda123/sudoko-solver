const board = document.getElementById("board");

// Step Counter
let steps = 0;
let lives = 3;

function updateLives(){

    let display="";

    for(let i=0;i<lives;i++)
        display+="❤️";

    for(let i=lives;i<3;i++)
        display+="🤍";

    document.getElementById("lives").innerHTML=display;

}

function updateSteps() {
    document.getElementById("steps").textContent = steps;
}

// Timer
let timerStarted = false;

for (let i = 0; i < 81; i++) {

    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.className = "cell";

    input.addEventListener("input", function () {

    if(!timerStarted){

        startTimer();
        timerStarted=true;

    }

    this.classList.remove("wrong");
this.classList.remove("user");

if (this.value === "") return;

let value = parseInt(this.value);

if (isNaN(value) || value < 1 || value > 9) {
    this.value = "";
    return;
}

let index = [...cells].indexOf(this);
let row = Math.floor(index / 9);
let col = index % 9;

let sudoku = getBoard();

// Remove this cell before checking
sudoku[row][col] = 0;

if (isSafe(sudoku, row, col, value)) {

    this.classList.add("user");

} else {

    this.classList.add("wrong");

    lives--;
    updateLives();

    if (lives <= 0) {

        stopTimer();
        timerStarted = false;

        alert("💀 Game Over!\n\nYou have used all 3 lives.");

        cells.forEach(cell => {
            cell.disabled = true;
        });
    }
}

// These lines must be INSIDE the input event
steps++;
updateSteps();

});   // <-- closes input.addEventListener()

board.appendChild(input);

}      // <-- closes the for loop

const cells = document.querySelectorAll(".cell");

function getBoard() {

    let sudoku = [];

    for (let i = 0; i < 9; i++) {

        sudoku[i] = [];

        for (let j = 0; j < 9; j++) {

            let value = cells[i * 9 + j].value;

            sudoku[i][j] = value === "" ? 0 : parseInt(value);

        }

    }

    return sudoku;

}

function setBoard(boardData) {

    for (let i = 0; i < 9; i++) {

        for (let j = 0; j < 9; j++) {

            const cell = cells[i * 9 + j];

            if(boardData[i][j]===0){

                cell.value="";
                cell.readOnly=false;
                cell.classList.remove("given");

            }
            else{

                cell.value=boardData[i][j];

                cell.readOnly=true;

                cell.classList.add("given");

            }

            cell.classList.remove("wrong");
            cell.classList.remove("user");

        }

    }

}

function isSafe(board, row, col, num) {

    for (let x = 0; x < 9; x++) {

        if (board[row][x] === num || board[x][col] === num)
            return false;

    }

    let startRow = row - row % 3;
    let startCol = col - col % 3;

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[startRow + i][startCol + j] === num)
                return false;

    return true;

}

function solve(board) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) {

                for (let num = 1; num <= 9; num++) {

                    if (isSafe(board, row, col, num)) {

                        board[row][col] = num;

                        steps++;
                        updateSteps();

                        if (solve(board))
                            return true;

                        board[row][col] = 0;

                        steps++;
                        updateSteps();

                    }

                }

                return false;

            }

        }

    }

    return true;

}

document.getElementById("solveBtn").onclick = function () {

    let sudoku = getBoard();

    if (solve(sudoku)) {

        setBoard(sudoku);

    } else {

        alert("No Solution Exists!");

    }

    stopTimer();

};

document.getElementById("clearBtn").onclick = function () {

    cells.forEach(cell => {

        cell.value = "";
        cell.disabled = false;
        cell.classList.remove("wrong");
        cell.classList.remove("given");
        cell.classList.remove("user");

    });

    lives = 3;
    updateLives();

    steps = 0;
    updateSteps();

    timerStarted = false;
    stopTimer();

};
