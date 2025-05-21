const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

let items = [];

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.emit('items', items);

  socket.on('addItem', (itemObj) => {
    console.log('Received item:', itemObj);
    items.push(itemObj);
    io.emit('items', items);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
