# Gunakan image Node.js resmi
FROM node:18

# Direktori kerja dalam container
WORKDIR /app

# Salin file konfigurasi dan install dependencies
COPY package*.json ./
RUN npm install

# Salin semua file aplikasi
COPY . .

# Ekspos port sesuai dengan server.js
EXPOSE 3004

# Jalankan server saat container start
CMD ["node", "server.js"]
