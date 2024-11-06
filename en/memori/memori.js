const cardValues = [
    'https://cdn-icons-png.flaticon.com/128/9109/9109107.png',
    'https://cdn-icons-png.flaticon.com/128/9109/9109107.png',
    'https://cdn-icons-png.flaticon.com/128/667/667664.png',
    'https://cdn-icons-png.flaticon.com/128/667/667664.png',
    'https://cdn-icons-png.flaticon.com/128/3132/3132705.png',
    'https://cdn-icons-png.flaticon.com/128/3132/3132705.png',
    'https://cdn-icons-png.flaticon.com/128/744/744546.png',
    'https://cdn-icons-png.flaticon.com/128/744/744546.png',
    'https://cdn-icons-png.flaticon.com/128/2331/2331397.png',
    'https://cdn-icons-png.flaticon.com/128/2331/2331397.png',
    'https://cdn-icons-png.flaticon.com/128/3753/3753480.png',
    'https://cdn-icons-png.flaticon.com/128/3753/3753480.png',
    'https://cdn-icons-png.flaticon.com/128/2242/2242537.png',
    'https://cdn-icons-png.flaticon.com/128/2242/2242537.png',
    'https://cdn-icons-png.flaticon.com/128/3792/3792011.png',
    'https://cdn-icons-png.flaticon.com/128/3792/3792011.png'
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
        card.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/128/16001/16001454.png" alt="Card Image">'; 

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