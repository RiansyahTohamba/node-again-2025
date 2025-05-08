import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || '27017';
const dbName = 'ujian_db';

const uri = `mongodb://${host}:${port}/${dbName}`;

export default async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log(`✅ Terhubung ke MongoDB di ${uri}`);
  } catch (err) {
    console.error('❌ Gagal koneksi MongoDB:', err.message);
    process.exit(1);
  }
}
