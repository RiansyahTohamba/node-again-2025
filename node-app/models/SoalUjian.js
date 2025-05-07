import mongoose from 'mongoose';
export default mongoose.model('SoalUjian', new mongoose.Schema({
  pertanyaan: String,
  opsi: [String], // opsi[0] = A, opsi[1] = B, ...
  jawabanBenar: Number // index opsi yang benar
}));
