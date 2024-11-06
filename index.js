const WebSocket = require('ws');  // Load the WebSocket library
const server = new WebSocket.Server({ port: 8080 });  // Start server on port 8080

// Handle new connections
server.on('connection', (socket) => {
    console.log('New client connected');  // Log new client connection

    // Relay messages to all connected clients
    socket.on('message', (message) => {
        server.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);  // Send message to other clients
            }
        });
    });

    // Handle client disconnect
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('Relay server running on ws://localhost:8080');