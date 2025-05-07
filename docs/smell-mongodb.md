Berikut beberapa **tips penting** dan **"code smells"** (tanda desain buruk) yang perlu diperhatikan saat menggunakan MongoDB, khususnya dalam konteks aplikasi Node.js + Mongoose:

---

### **Tips Best Practice MongoDB**

1. **Gunakan Schema yang Konsisten**
   Meski MongoDB bersifat *schema-less*, gunakan Mongoose untuk menjaga konsistensi data.

2. **Indeks yang Tepat**

   * Buat indeks pada kolom yang sering digunakan untuk pencarian (`find`, `sort`, `populate`).
   * Gunakan `.explain("executionStats")` untuk menganalisis performa query.

3. **Gunakan `ObjectId` untuk relasi antar koleksi**
   Gunakan `ref` dan `populate()` saat butuh foreign key-like behavior.

4. **Simpan hanya data yang dibutuhkan**
   Hindari menyimpan dokumen besar dengan banyak properti tak terpakai.

5. **Gunakan Projection (`select`)**
   Ambil hanya field yang diperlukan, contoh: `Model.find({}, 'nama email')`.

6. **Batasi jumlah dokumen (`limit`, `skip`)**
   Berguna untuk paginasi dan menghindari *memory overflow*.

7. **Gunakan Transaction (multi-document)**
   Jika menggunakan MongoDB 4.0+, gunakan transaksi untuk operasi lintas koleksi.

---

### **MongoDB Design/Usage Smells (Yang Harus Dihindari)**

| **Smell**                                            | **Penjelasan**                                  | **Alternatif**                                        |
| ---------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| **Dokumen terlalu besar (> 16MB)**                   | Biasanya akibat menyimpan array besar atau file | Gunakan GridFS atau pecah ke koleksi terpisah         |
| **Menyimpan data duplikat antar koleksi**            | Sulit di-maintain saat update                   | Gunakan referensi + `populate()`                      |
| **Tidak ada indeks pada field pencarian**            | Query lambat, full collection scan              | Tambahkan indeks yang tepat                           |
| **Bergantung pada urutan array untuk logika bisnis** | Risiko inkonsistensi                            | Simpan dengan struktur yang eksplisit                 |
| **Menggunakan `.save()` tanpa validasi**             | Risiko menyimpan data kotor                     | Gunakan Mongoose schema & validation                  |
| **Update dokumen besar dengan operasi replace**      | Bisa menyebabkan write amplification            | Gunakan `$set` untuk update parsial                   |
| **Hardcode koneksi string di kode**                  | Tidak aman dan sulit dipindahkan                | Gunakan variabel environment                          |
| **Terlalu banyak query dalam satu request**          | Overhead tinggi                                 | Gabungkan query dengan `aggregate` atau gunakan `$in` |

---

### **Tambahan untuk Mongoose**

* Selalu validasi input (baik lewat schema maupun middleware).
* Gunakan `lean()` untuk membaca data read-only yang tidak butuh instance Mongoose.
* Hindari `populate` dalam loop — gabungkan dalam satu query.

---

Ingin saya bantu audit atau review skema MongoDB milikmu?
