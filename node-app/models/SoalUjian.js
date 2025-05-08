import mongoose from 'mongoose';
export default mongoose.model('SoalUjian', new mongoose.Schema({
  pertanyaan: String,
  pilihan: [String],
  jawabanBenar: String
}));
