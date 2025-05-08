import mongoose from 'mongoose';
export default mongoose.model('CalonMahasiswa', new mongoose.Schema({
  nama: String
}));