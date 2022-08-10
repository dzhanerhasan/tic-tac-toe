const createPlayer = (name, symb, turn) => {
    let playerArr = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
    ];
    return { name, symb, turn, playerArr };
};

const gameBoard = (() => {
    let playAgainDiv;
    let winnerText;
    let playAgainBtn;

    const winCons = (() => {
        const sameRow = player => {
            for (let i = 0; i < player.playerArr.length; i++) {
                let isWinner = true;
                for (let j = 0; j < player.playerArr[i].length; j++) {
                    if (player.playerArr[i][j] !== player.symb) {
                        isWinner = false;
                        break;
                    }
                }
                if (isWinner) return true;
            }
        };

        const leftRightDiagonals = player => {
            const first = player.playerArr[0][0];
            const second = player.playerArr[1][1];
            const third = player.playerArr[2][2];
            return (
                first === player.symb &&
                second === player.symb &&
                third === player.symb
            );
        };

        const rightLeftDiagonal = player => {
            const first = player.playerArr[0][2];
            const second = player.playerArr[1][1];
            const third = player.playerArr[2][0];
            return (
                first === player.symb &&
                second === player.symb &&
                third === player.symb
            );
        };

        const firstCol = player => {
            const first = player.playerArr[0][0];
            const second = player.playerArr[1][0];
            const third = player.playerArr[2][0];
            return (
                first === player.symb &&
                second === player.symb &&
                third === player.symb
            );
        };

        const secondCol = player => {
            const first = player.playerArr[0][1];
            const second = player.playerArr[1][1];
            const third = player.playerArr[2][1];
            return (
                first === player.symb &&
                second === player.symb &&
                third === player.symb
            );
        };

        const thirdCol = player => {
            const first = player.playerArr[0][2];
            const second = player.playerArr[1][2];
            const third = player.playerArr[2][2];
            return (
                first === player.symb &&
                second === player.symb &&
                third === player.symb
            );
        };

        const checkWinner = player => {
            return (
                sameRow(player) ||
                leftRightDiagonals(player) ||
                rightLeftDiagonal(player) ||
                firstCol(player) ||
                secondCol(player) ||
                thirdCol(player)
            );
        };

        return { checkWinner };
    })();

    const createWinnerText = () => {
        playAgainDiv = document.createElement('div');
        playAgainDiv.classList.add('again-div');
        winnerText = document.createElement('div');
        playAgainBtn = document.createElement('button');
        winnerText.setAttribute('id', 'winner-text');
        playAgainBtn.setAttribute('id', 'play-again');
        playAgainDiv.append(winnerText, playAgainBtn);
        playAgainBtn.textContent = 'Play Again';
        playAgainBtn.addEventListener('click', renderPage);
        document.querySelector('body').append(playAgainDiv);
    };

    const updatePlayerBoard = (player, item) => {
        for (let i = 0; i < player.playerArr.length; i++) {
            for (let j = 0; j < player.playerArr[i].length; j++) {
                if (player.playerArr[i][j] == item.dataset.position) {
                    player.playerArr[i][j] = player.symb;
                }
            }
        }
        if (winCons.checkWinner(player)) {
            createWinnerText();
            boardDiv.remove();
            winnerText.textContent = `The winner is ${player.name}`;
        } else if (rounds === 9) {
            createWinnerText();
            boardDiv.remove();
            winnerText.textContent = `It's a draw!`;
        }
    };

    const updatePlayerStats = (p1, p2, item) => {
        if (p1.turn) {
            p1.turn = false;
            p2.turn = true;
            updatePlayerBoard(p1, item);
        } else {
            p1.turn = true;
            p2.turn = false;
            updatePlayerBoard(p2, item);
        }
    };

    const createBoard = () => {
        boardDiv = document.createElement('div');
        boardDiv.classList.add('container');
        document.querySelector('body').append(boardDiv);
        gameArr.forEach(row => {
            row.forEach(col => {
                const currCol = document.createElement('div');
                currCol.dataset.position = col;
                currCol.classList.add('board');
                boardDiv.append(currCol);
            });
        });
    };

    const createNewGame = () => {
        createBoard();
        setUpBoard();
    };

    const setUpBoard = () => {
        const myBoard = document.querySelectorAll('.board');
        myBoard.forEach(item => {
            item.addEventListener('click', () => {
                gameBoard.play(item);
            });
        });
    };

    const play = item => {
        if (!item.textContent) {
            item.textContent = playerOne.turn ? playerOne.symb : playerTwo.symb;
            rounds++;
        } else {
            return;
        }

        updatePlayerStats(playerOne, playerTwo, item);
    };

    return { play, createNewGame };
})();

const gameArr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
let rounds;
let playerOne;
let playerTwo;
let firstPlayerInput;
let secondPlayerInput;
let inputDiv;
let boardDiv;
let startGameBtn;

const startGame = () => {
    const firstPlayerName = document.querySelector('#first-player').value;
    const secondPlayerName = document.querySelector('#second-player').value;
    const inputDiv = document.querySelector('.input-div');
    const startGameBtn = document.querySelector('#start-game');

    if (!firstPlayerName) {
        firstPlayerInput.style.border = 'solid 2px red';
        return;
    } else if (!secondPlayerName) {
        secondPlayerInput.style.border = 'solid 2px red';
        return;
    }
    inputDiv.remove();
    startGameBtn.remove();
    gameBoard.createNewGame();
    playerOne = createPlayer(firstPlayerName, 'X', true);
    playerTwo = createPlayer(secondPlayerName, 'O', false);
    rounds = 0;
};

const renderPage = () => {
    document.querySelector('body').textContent = '';
    firstPlayerInput = document.createElement('input');
    secondPlayerInput = document.createElement('input');
    inputDiv = document.createElement('div');
    startGameBtn = document.createElement('button');

    Object.assign(firstPlayerInput, {
        type: 'text',
        placeholder: 'First Player',
        id: 'first-player',
    });

    Object.assign(secondPlayerInput, {
        type: 'text',
        placeholder: 'Second Player',
        id: 'second-player',
    });

    inputDiv.classList.add('input-div');

    startGameBtn.setAttribute('id', 'start-game');
    startGameBtn.textContent = 'Start Game';
    startGameBtn.addEventListener('click', startGame);

    inputDiv.append(firstPlayerInput, secondPlayerInput);
    document.querySelector('body').append(inputDiv, startGameBtn);
};

renderPage();
