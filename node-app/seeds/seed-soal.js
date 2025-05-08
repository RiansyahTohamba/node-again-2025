import mongoose from 'mongoose';
import Soal from '../models/SoalUjian.js';
import connectDB from '../config/db.js';

await connectDB();

try {
  await Soal.deleteMany();

  await Soal.insertMany([
    {
      pertanyaan: "Apa ibu kota Indonesia?",
      pilihan: ["Bandung", "Surabaya", "Jakarta", "Medan"],
      jawabanBenar: "Jakarta"
    },
    {
      pertanyaan: "Berapa hasil dari 5 + 3?",
      pilihan: ["5", "8", "10", "7"],
      jawabanBenar: "8"
    },
    {
      pertanyaan: "Siapa presiden Indonesia tahun 2024?",
      pilihan: ["Jokowi", "Megawati", "Prabowo", "Sukarno"],
      jawabanBenar: "Prabowo"
    }
  ]);

  console.log('Data soal berhasil ditambahkan');
  await mongoose.disconnect();
} catch (err) {
  console.error(err);
  await mongoose.disconnect();
}
