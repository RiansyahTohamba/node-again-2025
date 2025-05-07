Relasi pada mongodb dicapai dengan cara
1. referencing
2. embedding



| Kasus                         | Gunakan Referencing | Gunakan Embedding |
| ----------------------------- | ------------------- | ----------------- |
| Data besar, sering berubah    | Ya                  | Tidak             |
| Akses data terpisah           | Ya                  | Tidak             |
| Data kecil dan jarang berubah | Boleh               | Ya                |
| Butuh atomic update           | Tidak               | Ya                |
<!-- referencing -->
// CalonMahasiswa.js
const schema = new Schema({
  nama: String,
  email: String,
});

// HasilTes.js
const schema = new Schema({
  nilai: Number,
  mahasiswa: { type: Schema.Types.ObjectId, ref: 'CalonMahasiswa' }
});
<!-- embedding -->
const HasilTes = new Schema({
  nilai: Number,
  mahasiswa: {
    nama: String,
    email: String
  }
});


<!-- contoh -->
// CalonMahasiswa
{ _id: ObjectId("abc123"), nama: "Rudi" }

// HasilTes
{ nilai: 85, mahasiswa: ObjectId("abc123") }

