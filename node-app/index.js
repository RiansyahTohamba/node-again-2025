const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const url = 'mongodb://localhost:27017';
const dbName = 'tes_masuk_kampus';

async function main() {
  const client = new MongoClient(url);
  await client.connect();
  console.log('Terhubung ke MongoDB');

  const db = client.db(dbName);

  app.post('/daftar', async (req, res) => {
    const { nama, nomor_peserta, program_studi } = req.body;
    const result = await db.collection('calon_mahasiswa').insertOne({ nama, nomor_peserta, program_studi });
    res.send(result);
  });

  app.get('/soal', async (req, res) => {
    const soal = await db.collection('soal_ujian').find().toArray();
    res.send(soal);
  });

  app.post('/submit', async (req, res) => {
    const { nomor_peserta, jawaban } = req.body;

    // Ambil soal untuk validasi jawaban
    const soal = await db.collection('soal_ujian').find().toArray();
    let skor = 0;

    jawaban.forEach(j => {
      const soalDitemukan = soal.find(s => s._id.toString() === j.id_soal);
      if (soalDitemukan && soalDitemukan.jawaban_benar === j.jawaban_dipilih) {
        skor += 10; // misal 10 poin per soal benar
      }
    });

    const result = await db.collection('hasil_tes').insertOne({ nomor_peserta, jawaban, skor });
    res.send(result);
  });

  app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
  });
}

main();
