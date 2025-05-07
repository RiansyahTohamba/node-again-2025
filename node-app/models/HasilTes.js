import mongoose from 'mongoose';
export default mongoose.model('HasilTes', new mongoose.Schema({
  mahasiswa: { type: mongoose.Schema.Types.ObjectId, ref: 'CalonMahasiswa' },
  jawaban: [Number], // index jawaban peserta
  skor: Number,
  tanggal: { type: Date, default: Date.now }
}));
