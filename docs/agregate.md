| Tahapan    | Fungsi                                                           |
| ---------- | ---------------------------------------------------------------- |
| `$group`   | Mengelompokkan data dan melakukan agregasi (`$avg`, `$sum`, dsb) |
| `$lookup`  | Join antar koleksi (seperti SQL JOIN)                            |
| `$unwind`  | Membuka array jadi dokumen terpisah                              |
| `$project` | Menentukan field mana yang ditampilkan                           |
| `$match`   | Filter (seperti WHERE di SQL)                                    |
| `$sort`    | Urutkan hasil                                                    |
| `$limit`   | Batasi jumlah hasil                                              |

<!-- contoh soal benar terbanyak -->
HasilTes.aggregate([
  { $match: { benar: true } },
  { $group: { _id: "$soal_id", jumlahBenar: { $sum: 1 } } },
  { $sort: { jumlahBenar: -1 } }
])

<!-- hitung rata-rata nilai -->
HasilTes.aggregate([
  {
    $group: {
      _id: "$mahasiswa",       // Kelompokkan berdasarkan ID mahasiswa
      rataNilai: { $avg: "$nilai" },
      maxNilai: { $max: "$nilai" },
      minNilai: { $min: "$nilai" }
    }
  },
  {
    $lookup: {
      from: "calonmahasiswas", // Koleksi tujuan lookup
      localField: "_id",       // Field dari hasil sebelumnya
      foreignField: "_id",
      as: "dataMahasiswa"
    }
  },
  { $unwind: "$dataMahasiswa" },
  {
    $project: {
      nama: "$dataMahasiswa.nama",
      email: "$dataMahasiswa.email",
      rataNilai: 1,
      maxNilai: 1,
      minNilai: 1
    }
  }
])
