import HasilTes from '../models/HasilTes.js';
import CalonMahasiswa from '../models/CalonMahasiswa.js';
import SoalUjian from '../models/SoalUjian.js';

export const submitJawaban = async (req, res) => {
  const nama = req.body.nama;
  let mhs = await CalonMahasiswa.findOne({ nama });
  if (!mhs) mhs = await CalonMahasiswa.create({ nama });

  const soal = await SoalUjian.find();
  let nilai = 0;

  const jawaban = Object.keys(req.body)
    .filter(key => key.startsWith('jawaban['))
    .sort((a, b) => {
      const i = parseInt(a.match(/\d+/)[0]);
      const j = parseInt(b.match(/\d+/)[0]);
      return i - j;
    })
    .map(key => req.body[key]); // ["0", "2", "3"]

  soal.forEach((s, i) => {
    const jawabanUser = s.pilihan[parseInt(jawaban[i])]; // ubah index jadi string jawaban
    if (s.jawabanBenar === jawabanUser) {
      nilai += 1;
    }
  });

  await HasilTes.create({ mahasiswa: mhs._id, jawaban, nilai });

  res.render('hasil', { nama, nilai, total: soal.length });
};
