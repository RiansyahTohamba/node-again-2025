import mongoose from 'mongoose';
export default mongoose.model('HasilTes', new mongoose.Schema({
  nilai: Number,
  mahasiswa: { type: mongoose.Schema.Types.ObjectId, ref: 'CalonMahasiswa' },
}));
