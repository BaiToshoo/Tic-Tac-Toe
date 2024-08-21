window.addEventListener('load', solve);

function solve() {

    let player = 1;
    let player1Wins = 0;
    let player2Wins = 0;

    const print = document.getElementById('print');
    const b1 = document.getElementById('b1');
    const b2 = document.getElementById('b2');
    const b3 = document.getElementById('b3');
    const b4 = document.getElementById('b4');
    const b5 = document.getElementById('b5');
    const b6 = document.getElementById('b6');
    const b7 = document.getElementById('b7');
    const b8 = document.getElementById('b8');
    const b9 = document.getElementById('b9');
    
    const resetButton = document.getElementById('reset')

    b1.addEventListener('click', () => turn(b1))
    b2.addEventListener('click', () => turn(b2))
    b3.addEventListener('click', () => turn(b3))
    b4.addEventListener('click', () => turn(b4))
    b5.addEventListener('click', () => turn(b5))
    b6.addEventListener('click', () => turn(b6))
    b7.addEventListener('click', () => turn(b7))
    b8.addEventListener('click', () => turn(b8))
    b9.addEventListener('click', () => turn(b9))
    resetButton.addEventListener('click', reset)

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
        player = 1;
        print.textContent = 'Player 1 turn(X)';
    }

    function turn(b) {
        if (player === 1 && b.textContent === '') {
            b.textContent = 'X';
            print.textContent = 'Player 2 turn (O)';
            player = 2;
        } else if (player === 2 && b.textContent === '') {
            b.textContent = 'O';
            print.textContent = 'Player 1 turn (X)';
            player = 1;
        }
    }
}


