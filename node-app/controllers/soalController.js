import SoalUjian from '../models/SoalUjian.js';

export const tampilkanSoal = async (req, res) => {
  const soal = await SoalUjian.find();
  res.render('soal', { soal });
};
