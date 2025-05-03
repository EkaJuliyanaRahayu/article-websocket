const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', ws => {
  console.log('Pengguna terhubung.');

  ws.on('message', message => {
    const text = message.toString();  // ubah buffer ke string
    console.log('Pesan:', text);
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });
  
  ws.on('close', () => console.log('Pengguna keluar.'));
});

server.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
