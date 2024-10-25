let selectedNumber = null;
let filledCells = 0;

function chooseNumber(number) {
    selectedNumber = number;
}

const boardElement = document.getElementById('sudoku-board');

function createBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => {
            if (selectedNumber) {
                cell.textContent = selectedNumber;
                filledCells++;

               
                if (filledCells === 81) {
                    if (checkVictory()) {
                        alert('Victory! Congratulations, you solved the Sudoku!');
                    } else {
                        alert('Defeat. The Sudoku solution is incorrect. Please try again!');
                    }
                }
            }
        });
        boardElement.appendChild(cell);
    }
}

const SIZE = 9;
const SUBGRID_SIZE = 3;

function isSafe(board, row, col, num) {
    for (let x = 0; x < SIZE; x++) {
        if (board[row][x] === num) return false;
    }
    for (let x = 0; x < SIZE; x++) {
        if (board[x][col] === num) return false;
    }
    const startRow = row - (row % SUBGRID_SIZE);
    const startCol = col - (col % SUBGRID_SIZE);
    for (let i = 0; i < SUBGRID_SIZE; i++) {
        for (let j = 0; j < SUBGRID_SIZE; j++) {
            if (board[i + startRow][j + startCol] === num) return false;
        }
    }
    return true;
}

function fillBoard(board) {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (board[i][j] === 0) {
                for (let num = 1; num <= SIZE; num++) {
                    if (isSafe(board, i, j, num)) {
                        board[i][j] = num;
                        if (fillBoard(board)) {
                            return true;
                        }
                        board[i][j] = 0;
                    }
                }
                return false; 
            }
        }
    }
    return true;
}

function generateFullBoard() {
    const board = Array.from(Array(SIZE), () => Array(SIZE).fill(0));
    fillBoard(board);
    return board;
}

function generateSudokuBoard(level) {
    const board = generateFullBoard();
    let removeCount;
    switch (level) {
        case 'easy':
            removeCount = 35;
            break;
        case 'medium':
            removeCount = 45;
            break;
        case 'hard':
            removeCount = 55;
            break;
    }
    while (removeCount > 0) {
        const row = Math.floor(Math.random() * SIZE);
        const col = Math.floor(Math.random() * SIZE);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            removeCount--;
        }
    }
    return board;
}

function fillBoardOnGameStart(board) {
    const cells = document.querySelectorAll('.cell');
    let index = 0;
    for (let row of board) {
        for (let num of row) {
            if (num !== 0) {
                cells[index].textContent = num;
            } else {
                cells[index].textContent = ''; 
            }
            index++;
        }
    }
}

function checkVictory() {
    const cells = document.querySelectorAll('.cell');
    const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    
    let index = 0;
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (cells[index].textContent === '') {
                return false; 
            }
            board[row][col] = Number(cells[index].textContent);
            index++;
        }
    }

    for (let i = 0; i < SIZE; i++) {
        const rowCheck = new Set();
        const colCheck = new Set();
        for (let j = 0; j < SIZE; j++) {
            if (rowCheck.has(board[i][j]) || board[i][j] < 1 || board[i][j] > SIZE) return false;
            rowCheck.add(board[i][j]);

            if (colCheck.has(board[j][i]) || board[j][i] < 1 || board[j][i] > SIZE) return false;
            colCheck.add(board[j][i]);
        }
    }

    for (let rowStart = 0; rowStart < SIZE; rowStart += SUBGRID_SIZE) {
        for (let colStart = 0; colStart < SIZE; colStart += SUBGRID_SIZE) {
            const subgridCheck = new Set();
            for (let i = 0; i < SUBGRID_SIZE; i++) {
                for (let j = 0; j < SUBGRID_SIZE; j++) {
                    const num = board[rowStart + i][colStart + j];
                    if (subgridCheck.has(num) || num < 1 || num > SIZE) return false;
                    subgridCheck.add(num);
                }
            }
        }
    }

    return true; 
}

function startGame(level) {
    fillCells = 0; 
    createBoard();
    const board = generateSudokuBoard(level);
    fillBoardOnGameStart(board);
}

function clearBoard() {
    fillCells = 0; 
    createBoard();
}

createBoard();