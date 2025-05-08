import mongoose from 'mongoose';
import Soal from '../models/SoalUjian.js';
import connectDB from '../config/db.js';

await connectDB();

try {
  console.log('Terhubung ke MongoDB');

  await Soal.deleteMany();

  await Soal.insertMany([
    {
      pertanyaan: "Apa ibu kota Indonesia?",
      pilihan: ["Bandung", "Surabaya", "Jakarta", "Medan"],
      jawaban: "Jakarta"
    },
    {
      pertanyaan: "Berapa hasil dari 5 + 3?",
      pilihan: ["5", "8", "10", "7"],
      jawaban: "8"
    },
    {
      pertanyaan: "Siapa presiden Indonesia tahun 2024?",
      pilihan: ["Jokowi", "Megawati", "Prabowo", "Sukarno"],
      jawaban: "Prabowo"
    }
  ]);

  console.log('Data soal berhasil ditambahkan');
  await mongoose.disconnect();
} catch (err) {
  console.error(err);
  await mongoose.disconnect();
}
