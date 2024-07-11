const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

// Serve static files from the 'public' directory under the '/static' path
app.use(express.static(path.join(__dirname, '/public')));

// Route for serving the index.html file
app.get('/', function(req, res) {
    // Read the 'index.html' file from the 'public' directory
    fs.readFile(path.join(__dirname, 'public', 'index.html'), function(error, data) {
        if (error){
            // Handle file not found error
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Error: File not Found');
        } else {
            // Send the contents of the file
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Start the server listening on the specified port
server.listen(port, function(error) {
    if (error){
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
