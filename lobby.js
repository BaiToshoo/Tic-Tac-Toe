document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const message = document.getElementById('message');
    const playerCount = document.getElementById('player-count');
    const lobbyIdElement = document.getElementById('lobby-id');
    const lobbyId = lobbyIdElement.getAttribute('data-lobby-id');

    lobbyIdElement.textContent = lobbyId;

    socket.emit('join-lobby', lobbyId);

    socket.on('player-count', (count) => {
        playerCount.textContent = count;
        if (count === 2) {
            setTimeout(() => {
                loadPage(`/game/${lobbyId}`);
            }, 5000);
        }
    });

    socket.on('message', (msg) => {
        message.textContent = msg;
    });

    function loadPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.open();
                document.write(html);
                document.close();
            })
            .catch(error => console.error('Error loading page:', error));
    }
});
