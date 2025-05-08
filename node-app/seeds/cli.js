import mongoose from 'mongoose';
import CalonMahasiswa from '../models/CalonMahasiswa.js';
import connectDB from '../config/db.js';
import HasilTes from '../models/HasilTes.js';

await connectDB();

try {

  await mongoose.disconnect();
} catch (err) {
  console.error(err);
  await mongoose.disconnect();
}
