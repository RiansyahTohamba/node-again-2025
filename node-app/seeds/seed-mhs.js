import mongoose from 'mongoose';
import CalonMahasiswa from '../models/CalonMahasiswa.js';
import connectDB from '../config/db.js';

await connectDB();

try {

  await CalonMahasiswa.deleteMany();

  await CalonMahasiswa.insertMany([
    { nama: "Aulia Rahman", email: "aulia@mail.com" },
    { nama: "Dinda Kartika", email: "dinda@mail.com" },
    { nama: "Bayu Prasetyo", email: "bayu@mail.com" }
  ]);

  console.log('Data mahasiswa berhasil ditambahkan');
  await mongoose.disconnect();
} catch (err) {
  console.error(err);
  await mongoose.disconnect();
}
