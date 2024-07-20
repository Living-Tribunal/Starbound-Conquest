const port = 3001;
const fs = require('fs');
const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./public/data/game_canvas.db', (err) =>{
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite Game Canvas database.');
});

db.close((err) =>{
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});

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
        let index = ships.findIndex(s => s.id === ship.id);
        if (index === -1){
         ships.push(ship);   
         io.emit('shipCreated', ship);
        } // Broadcast the new ship to all clients
    });

    socket.on('moveShip', (ship) => {
        let index = ships.findIndex(s => s.id === ship.id);
        if (index !== -1) {
            ships[index] = {
                ...ships[index],
                ...ship,
                image: ships[index].image
            };
        }
        io.emit('shipMoved', ship);
    });

    socket.on("updateShipHP", (shipData) => {
        let index = ships.findIndex((s) => s.id === shipData.id);
        if (index !== -1) {
          ships[index].hp = shipData.hp;
          io.emit('shipHPUpdated', ships[index]); // Broadcast the updated HP to all clients
        }
    });
    
    socket.on("updateShipRotate", (shipData) => {
        let index = ships.findIndex((s) => s.id === shipData.id);
        if (index !== -1) {
          ships[index].rotation_angle = shipData.rotation_angle;
          io.emit('shipRotated', ships[index]); // Broadcast the updated rotation to all clients
        }
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
