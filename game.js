addEventListener('DOMContentLoaded', () => {
    let player = 1;
    let player1Wins = 0;
    let player2Wins = 0;

    const socket = io();
    const jsConfetti = new JSConfetti();
    const print = document.getElementById('print');
    const player1Score = document.getElementById('player1-score');
    const player2Score = document.getElementById('player2-score');
    const resetButton = document.getElementById('reset-btn');

    const b1 = document.getElementById('b1');
    const b2 = document.getElementById('b2');
    const b3 = document.getElementById('b3');
    const b4 = document.getElementById('b4');
    const b5 = document.getElementById('b5');
    const b6 = document.getElementById('b6');
    const b7 = document.getElementById('b7');
    const b8 = document.getElementById('b8');
    const b9 = document.getElementById('b9');

    const cells = [b1, b2, b3, b4, b5, b6, b7, b8, b9];

    cells.forEach(cell => {
        cell.addEventListener('click', () => makeMove(cell));
    });

    resetButton.addEventListener('click', resetScore);

    socket.on('move-made', (data) => {
        const { cellId, player } = data;
        const cell = document.getElementById(cellId);
        cell.textContent = player === 1 ? 'X' : 'O';
        cell.classList.add(player === 1 ? 'x' : 'o');
        print.textContent = `Player ${player === 1 ? '2' : '1'} turn (${player === 1 ? 'O' : 'X'})`;
        checkForWinner();
    });

    function makeMove(cell) {
        if (cell.textContent === '') {
            cell.textContent = player === 1 ? 'X' : 'O';
            cell.classList.add(player === 1 ? 'x' : 'o');
            socket.emit('make-move', { lobbyId: window.location.pathname.split('/').pop(), cellId: cell.id, player });
            print.textContent = `Player ${player === 1 ? '2' : '1'} turn (${player === 1 ? 'O' : 'X'})`;
            player = player === 1 ? 2 : 1;
            checkForWinner();
        }
    }

    function resetScore() {
        player1Wins = 0;
        player2Wins = 0;
        updateScoreboard();
        reset();
    }

    function disableBoxes() {
        cells.forEach(cell => cell.removeEventListener('click', () => makeMove(cell)));
    }

    function enableBoxes() {
        cells.forEach(cell => cell.addEventListener('click', () => makeMove(cell)));
    }

    function reset() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        print.textContent = 'Player 1 turn (X)';
        player = 1;
        enableBoxes();
    }

    function checkForWinner() {
        const winningCombinations = [
            [b1, b2, b3],
            [b4, b5, b6],
            [b7, b8, b9],
            [b1, b4, b7],
            [b2, b5, b8],
            [b3, b6, b9],
            [b1, b5, b9],
            [b3, b5, b7]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (a.textContent !== '' && a.textContent === b.textContent && a.textContent === c.textContent) {
                print.textContent = `Player ${a.textContent === 'X' ? '1' : '2'} wins!`;
                if (a.textContent === 'X') {
                    player1Wins++;
                } else {
                    player2Wins++;
                }
                disableBoxes();
                updateScoreboard();
                jsConfetti.addConfetti({
                    emojis: ['🏆', '🔥'],
                    confettiNumber: 100,
                });
                setTimeout(reset, 2000);
                return;
            }
        }
        checkForDraw();
    }

    function checkForDraw() {
        if (cells.every(cell => cell.textContent !== '')) {
            print.textContent = 'It\'s a draw!';
            setTimeout(reset, 2000);
        }
    }

    function updateScoreboard() {
        player1Score.textContent = player1Wins;
        player2Score.textContent = player2Wins;
    }
});


