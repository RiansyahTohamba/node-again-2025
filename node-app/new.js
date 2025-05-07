import express from 'express';
import mongoose from 'mongoose';
import { WebSocketServer } from 'ws';

const app = express();
const port = 3000;

// MongoDB
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/ujian_db';
mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Contoh skema Mongo
const CalonMahasiswa = mongoose.model('calon_mahasiswa', new mongoose.Schema({ nama: String }));
const SoalUjian = mongoose.model('soal_ujian', new mongoose.Schema({ soal: String }));
const HasilTes = mongoose.model('hasil_tes', new mongoose.Schema({ hasil: String }));

// Express route
app.get('/', (req, res) => {
  res.send('Server Node.js aktif');
});

const server = app.listen(port, () => {
  console.log(`Aplikasi jalan di http://localhost:${port}`);
});

// WebSocket
const wss = new WebSocketServer({ server });
wss.on('connection', ws => {
  console.log('Client terhubung');
  ws.send('Halo dari server WebSocket!');
});
