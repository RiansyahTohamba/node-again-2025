FROM node:20

# Buat direktori kerja
WORKDIR /usr/src/app

# Salin dan install dependensi
COPY package*.json ./
RUN npm install

# Salin semua file kode
COPY . .

# Jalankan app
CMD [ "node", "index.js" ]
