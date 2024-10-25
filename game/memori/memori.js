const cardValues = [
    'https://cdn-icons-png.flaticon.com/128/3684/3684821.png',
    'https://cdn-icons-png.flaticon.com/128/3684/3684821.png',
    'https://cdn-icons-png.flaticon.com/128/12555/12555468.png',
    'https://cdn-icons-png.flaticon.com/128/12555/12555468.png',
    'https://cdn-icons-png.flaticon.com/128/5482/5482975.png',
    'https://cdn-icons-png.flaticon.com/128/5482/5482975.png',
    'https://cdn-icons-png.flaticon.com/128/3684/3684917.png',
    'https://cdn-icons-png.flaticon.com/128/3684/3684917.png',
    'https://cdn-icons-png.flaticon.com/128/8828/8828234.png',
    'https://cdn-icons-png.flaticon.com/128/8828/8828234.png',
    'https://cdn-icons-png.flaticon.com/128/3684/3684854.png',
    'https://cdn-icons-png.flaticon.com/128/3684/3684854.png',
    'https://cdn-icons-png.flaticon.com/128/5439/5439394.png',
    'https://cdn-icons-png.flaticon.com/128/5439/5439394.png',
    'https://cdn-icons-png.flaticon.com/128/12403/12403947.png',
    'https://cdn-icons-png.flaticon.com/128/12403/12403947.png'
];

let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

function init() {
    cards = [...cardValues].sort(() => 0.5 - Math.random());
    gameBoard.innerHTML = '';
    score = 0;
    scoreDisplay.textContent = score;

    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', cards[i]);
        card.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/128/8694/8694946.png" alt="Card Image">'; 

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    const img = this.querySelector('img');
    img.src = this.getAttribute('data-value'); 

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value');

    if (isMatch) {
        score++;
        scoreDisplay.textContent = score;
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.querySelector('img').src = ''; 
            secondCard.querySelector('img').src = ''; 
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

restartButton.addEventListener('click', init);

init();