const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('node:path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/lobby/:lobbyId', (req, res) => {
    const lobbyId = req.params.lobbyId;
    fs.readFile(path.join(__dirname, '..', 'lobby.html'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading lobby.html');
            return;
        }
        const updatedHtml = data.replace('{{lobbyId}}', lobbyId);
        res.send(updatedHtml);
    });
});

app.get('/game/:lobbyId', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'game.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join-lobby', (lobbyId) => {
        socket.join(lobbyId);
        const clients = io.sockets.adapter.rooms.get(lobbyId);
        const playerCount = clients ? clients.size : 0;
        io.to(lobbyId).emit('player-count', playerCount);
        console.log(`user joined lobby ${lobbyId}, player count: ${playerCount}`);
        if (playerCount === 2) {
            io.to(lobbyId).emit('message', 'A new user joined the lobby');
        }
    });

    socket.on('create-lobby', () => {
        const lobbyId = Math.random().toString(36).substring(7).toUpperCase();
        socket.join(lobbyId);
        console.log(`Lobby created: ${lobbyId}`);
        socket.emit('lobby-created', lobbyId);
    });

    socket.on('make-move', (data) => {
        const { lobbyId, cellId, player } = data;
        io.to(lobbyId).emit('move-made', { cellId, player });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        // Handle player disconnection from a room
        for (const [room, clients] of io.sockets.adapter.rooms.entries()) {
            if (clients.has(socket.id)) {
                const playerCount = clients.size - 1;
                io.to(room).emit('player-count', playerCount);
                console.log(`user left lobby ${room}, player count: ${playerCount}`);
                break;
            }
        }
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
