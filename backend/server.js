const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const aktiviteRoutes = require('./routes/aktiviteRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Uploads klasörünü statik olarak sunmak için
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/aktivite-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB bağlantısı başarılı'))
.catch(err => console.error('MongoDB bağlantı hatası:', err));

// Routes
app.use('/api', aktiviteRoutes);

// Server başlatma
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});