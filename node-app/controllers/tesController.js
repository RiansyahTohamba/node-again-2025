import HasilTes from '../models/HasilTes.js';
import CalonMahasiswa from '../models/CalonMahasiswa.js';
import SoalUjian from '../models/SoalUjian.js';

export const submitJawaban = async (req, res) => {
  const nama = req.body.nama;
  const jawaban = req.body.jawaban.map(Number);

  let mhs = await CalonMahasiswa.findOne({ nama });
  if (!mhs) mhs = await CalonMahasiswa.create({ nama });

  const soal = await SoalUjian.find();
  let skor = 0;
  soal.forEach((s, i) => {
    if (s.jawabanBenar === jawaban[i]) skor += 1;
  });

  await HasilTes.create({ mahasiswa: mhs._id, jawaban, skor });

  res.render('hasil', { nama, skor, total: soal.length });
};
