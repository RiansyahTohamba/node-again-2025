import HasilTes from '../models/HasilTes.js';
// import CalonMahasiswa from '../models/CalonMahasiswa.js';

export const tampilkanDashboard = async (req, res) => {
  try {
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
          email: "$mahasiswa.email",
          rataNilai: 1,
          maxNilai: 1,
          minNilai: 1,
          jumlahTes: 1
        }
      },
      { $sort: { rataNilai: -1 } }
    ]);

    res.render('dashboard', { data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan saat memuat dashboard');
}};