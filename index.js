window.addEventListener('load', solve);

window.addEventListener('load', solve);

function solve() {
    let player = 1;
    let player1Wins = 0;
    let player2Wins = 0;

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

    b1.addEventListener('click', () => turn(b1));
    b2.addEventListener('click', () => turn(b2));
    b3.addEventListener('click', () => turn(b3));
    b4.addEventListener('click', () => turn(b4));
    b5.addEventListener('click', () => turn(b5));
    b6.addEventListener('click', () => turn(b6));
    b7.addEventListener('click', () => turn(b7));
    b8.addEventListener('click', () => turn(b8));
    b9.addEventListener('click', () => turn(b9));
    resetButton.addEventListener('click', resetScore);

    function resetScore() {
        player1Wins = 0;
        player2Wins = 0;
        updateScoreboard();
        reset();
    }

    function disableBoxes() {
        b1.style.pointerEvents = 'none';
        b2.style.pointerEvents = 'none';
        b3.style.pointerEvents = 'none';
        b4.style.pointerEvents = 'none';
        b5.style.pointerEvents = 'none';
        b6.style.pointerEvents = 'none';
        b7.style.pointerEvents = 'none';
        b8.style.pointerEvents = 'none';
        b9.style.pointerEvents = 'none';
    }

    function enableBoxes() {
        b1.style.pointerEvents = 'auto';
        b2.style.pointerEvents = 'auto';
        b3.style.pointerEvents = 'auto';
        b4.style.pointerEvents = 'auto';
        b5.style.pointerEvents = 'auto';
        b6.style.pointerEvents = 'auto';
        b7.style.pointerEvents = 'auto';
        b8.style.pointerEvents = 'auto';
        b9.style.pointerEvents = 'auto';
    }

    function reset() {
        b1.textContent = '';
        b2.textContent = '';
        b3.textContent = '';
        b4.textContent = '';
        b5.textContent = '';
        b6.textContent = '';
        b7.textContent = '';
        b8.textContent = '';
        b9.textContent = '';
        b1.classList.remove('x', 'o');
        b2.classList.remove('x', 'o');
        b3.classList.remove('x', 'o');
        b4.classList.remove('x', 'o');
        b5.classList.remove('x', 'o');
        b6.classList.remove('x', 'o');
        b7.classList.remove('x', 'o');
        b8.classList.remove('x', 'o');
        b9.classList.remove('x', 'o');
        player = 1;
        print.textContent = 'Player 1 turn (X)';
        updateScoreboard();
        enableBoxes();
    }

    function turn(b) {
        if (player === 1 && b.textContent === '') {
            b.textContent = 'X';
            b.classList.add('x');
            print.textContent = 'Player 2 turn (O)';
            player = 2;
        } else if (player === 2 && b.textContent === '') {
            b.textContent = 'O';
            b.classList.add('o');
            print.textContent = 'Player 1 turn (X)';
            player = 1;
        }
        checkForWinner();
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
                setTimeout(reset, 2000);
                return;
            }
        }
        checkForDraw();
    }

    function checkForDraw() {
        if (b1.textContent !== '' && b2.textContent !== '' && b3.textContent !== '' && b4.textContent !== '' && b5.textContent !== '' && b6.textContent !== '' && b7.textContent !== '' && b8.textContent !== '' && b9.textContent !== '') {
            print.textContent = 'Draw!';
            disableBoxes();
            setTimeout(reset, 2000);
        }
    }

    function updateScoreboard() {
        player1Score.textContent = player1Wins;
        player2Score.textContent = player2Wins;
    }
}


