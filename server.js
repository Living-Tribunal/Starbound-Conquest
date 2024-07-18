const port = 3001;
const fs = require('fs');
const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: { origin: "*" }
});

let ships = [];

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.emit('initialize', ships);

    socket.on('createShip', (ship) => {
        console.log('Ship created');
        ships.push(ship);
        io.emit('shipCreated', ship); // Broadcast the new ship to all clients
    });

    socket.on('moveShip', (ship) => {
        /* console.log('Ship moved:', ship); */
        // Update the ship position in the server-side array
        let index = ships.findIndex(s => s.id === ship.id);
        if (index !== -1) {
            ships[index] = ship;
            /* console.log(ships); */
        }
        // Broadcast the moved ship to all clients
        io.emit('shipMoved', ship);
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the index.html file
app.get('/', function(res) {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), function(error, data) {
        if (error){
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Error: File not Found');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

// Start the HTTP server listening on the specified port
server.listen(port, function(error) {
    if (error){
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
