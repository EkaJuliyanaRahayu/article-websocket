| UTS |  Pemrograman Web 2  
|-------|---------
| NIM   | 312310594
| Nama  | Eka Juliyana Rahayu
| Kelas | TI.23.A6
| Dosen |  Agung Nugroho, S.Kom., M.Kom.
| Link Artikel |

# 💬 Eksperimen WebSocket : Solusi efisien untuk aplikasi chat real-time di web

## Pendahuluan
WebSocket adalah protokol jaringan yang telah distandarisasi melalui RFC 6455 dan dimaksudkan untuk menggantikan teknik polling atau long-polling yang biasa digunakan pada HTTP. Dengan membuat koneksi permanen antara klien dan server, WebSocket mendukung pertukaran data secara real-time tanpa perlu membuat permintaan ulang, berbeda dengan HTTP klasik. Untuk alasan ini, WebSocket sangat penting untuk aplikasi yang berfokus pada komunikasi langsung, seperti aplikasi chat.

## Konsep Websocket
Konsep dasar dari WebSocket dimulai dengan proses handshake, yaitu permintaan awal yang diajukan klien kepada server melalui protokol HTTP. Jika server mendukung WebSocket, koneksi tersebut ditingkatkan dan dapat digunakan untuk pertukaran data secara konsisten tanpa perlu membuat koneksi baru. Selama koneksi aktif, klien dan server dapat saling mengirim data kapan saja tanpa harus menunggu permintaan seperti yang terjadi dalam model HTTP.

Struktur Sistem:

•	Server: Node.js + Express + WebSocket (ws)

•	Client: HTML, JavaScript (asli, tanpa kerangka kerja)

•	Port: 3000

## 🧪 Eksperimen: Aplikasi Chat Sederhana

## 1. Persiapan proyek

```
cd c:\websocket-chat
```

![Screenshot 2025-05-04 194716](https://github.com/user-attachments/assets/960c16c9-b44a-4a2e-a39b-565091ec765c)

```
npm init -y
```
![Screenshot 2025-05-03 141932](https://github.com/user-attachments/assets/5e3807f1-86af-405b-8028-99ff4ce41ef8)

```
npm install express ws
```
![Screenshot 2025-05-03 141942](https://github.com/user-attachments/assets/10fee3f1-e80d-48d7-b30f-e99c4070042f)

## 2. Membuat server Websocket (server.js)
```
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
```
## 3. Membuat Antarmuka Client (public/index.html)
```
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Chat WebSocket</title>
</head>
<body>
  <h2>💬 Chat real-time</h2>
  <input id="name" placeholder="Nama Anda" />
  <br><br>
  <textarea id="chat" rows="10" cols="50" readonly></textarea><br>
  <input id="msg" placeholder="Tulis pesan..." />
  <button onclick="kirim()">Kirim</button>
  <script>
    const ws = new WebSocket(`ws://${location.host}`);
    const chat = document.getElementById("chat");

    ws.onmessage = event => {
      chat.value += event.data + '\n';
    };

    function kirim() {
      const name = document.getElementById("name").value;
      const msg = document.getElementById("msg").value;
      ws.send(`${name}: ${msg}`);
      document.getElementById("msg").value = '';
    }
  </script>
</body>
</html>
```

## ▶️ Menjalankan Aplikasi
1.jalankan server
```
node server.js
```
2.Buka beberapa tab browser
```
http://localhost:8080
```
pastikan ```index html```di buka lewat server lokal atau ekstensi live server untuk menghindari pembatasan CORS

![Screenshot 2025-05-04 195644](https://github.com/user-attachments/assets/fce631bc-ce63-4c09-8168-4c3776f22088)

## Hasil uji coba

![Screenshot 2025-05-03 162553](https://github.com/user-attachments/assets/ada03aa4-a388-438d-801d-145aeeb79e7d)

![Screenshot 2025-05-03 184021](https://github.com/user-attachments/assets/c832da64-2ea3-4f3b-9779-87be7bf3c67f)

  Setelah mengoperasikan server dan membuka halaman klien melalui localhost:3000, dua pengguna di dua tab browser dapat saling mengirim pesan dengan latensi di bawah 100ms. Koneksi tetap terjaga selama tidak ditutup secara manual, yang menunjukkan efektivitas WebSocket dalam berkomunikasi secara waktu nyata.

## Kesimpulan
  Implementasi WebSocket telah menunjukkan kemampuan luar biasa dalam menciptakan komunikasi dua arah dengan cara yang lebih efisien. Jika dibandingkan dengan metode tradisional yang menggunakan HTTP, WebSocket dapat menurunkan latensi dan pengeluaran sumber daya, serta lebih ideal untuk penggunaan dalam aplikasi seperti obrolan, pemberitahuan instan, dan kolaborasi secara langsung.
## Referensi 

DeadSimpleChat. (2024). WebSockets and NodeJs: Real-time Chat App. DeadSimpleChat Blog. https://deadsimplechat.com/blog/websockets-and-nodejs-real-time-chat-app/

Digital Samba. (2024). HTTP vs WebSocket: Real-Time Web Communication Guide. Digital Samba. https://www.digitalsamba.com/blog/websocket-vs-http

International Research Journal of Engineering and Technology. (2023). Enhancing Real-Time Communication and Efficiency With WebSocket. IRJET, 10(8). https://www.irjet.net/archives/V10/i8/IRJET-V10I8147.pdf

International Journal of Novel Research and Development. (2024). Enhancing Real-time Web Applications with WebSockets: Performance and Responsiveness. IJNRD, 9(6). https://www.ijnrd.org/papers/IJNRD2406082.pdf

Wu, Z. (2012). Research of Web Real-Time Communication Based on WebSocket. International Journal of Communications, Network and System Sciences, 5(12), 797–801. https://www.scirp.org/journal/paperinformation.aspx?paperid=25428






