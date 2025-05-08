import mongoose from 'mongoose';
import CalonMahasiswa from '../models/CalonMahasiswa.js';
import connectDB from '../config/db.js';
import HasilTes from '../models/HasilTes.js';
import SoalUjian from '../models/SoalUjian.js';

await connectDB();

try {
  // const soal = await SoalUjian.find();
  // console.log(soal)
  const data = await HasilTes.aggregate([
    {
      $group: {
        _id: "$mahasiswa",
        rataNilai: { $avg: "$nilai" },
        maxNilai: { $max: "$nilai" },
        minNilai: { $min: "$nilai" },
        jumlahTes: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "calonmahasiswas",
        localField: "_id",
        foreignField: "_id",
        as: "mahasiswa"
      }
    },
    { $unwind: "$mahasiswa" },
    {
      $project: {
        _id: 0,
        nama: "$mahasiswa.nama",
        rataNilai: 1,
        maxNilai: 1,
        minNilai: 1,
        jumlahTes: 1
      }
    },
    { $sort: { rataNilai: -1 } }
  ]);
  console.log(data)
  await mongoose.disconnect();
} catch (err) {
  console.error(err);
  await mongoose.disconnect();
}
