document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const joinLobbyBtn = document.getElementById('join-lobby-btn');
    const createLobbyBtn = document.getElementById('create-lobby-btn');

    joinLobbyBtn.addEventListener('click', joinLobby);
    createLobbyBtn.addEventListener('click', createLobby);

    function joinLobby() {
        const lobbyId = document.getElementById('lobby-id').value;
        if (lobbyId) {
            socket.emit('join-lobby', lobbyId);
            loadPage(`/lobby/${lobbyId}`);
        } else {
            showMessage('Please enter a lobby ID.');
        }
    }

    function createLobby() {
        socket.emit('create-lobby');
        socket.on('lobby-created', (lobbyId) => {
            loadPage(`/lobby/${lobbyId}`);
        });
    }

    function showMessage(message) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
    }

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
