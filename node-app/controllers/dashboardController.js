import HasilTes from '../models/HasilTes.js';
// import CalonMahasiswa from '../models/CalonMahasiswa.js';

export const tampilkanDashboard = async (req, res) => {
  const data = await HasilTes.find().populate('mahasiswa');
  res.render('dashboard', { data });
};
