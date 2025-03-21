const mongoose = require('mongoose');

const AktiviteSchema = new mongoose.Schema({
  aktiviteAdi: {
    type: String,
    required: true,
    trim: true
  },
  tarih: {
    type: Date,
    required: true
  },
  aciklama: {
    type: String,
    required: true,
    trim: true
  },
  dosyaYolu: {
    type: String,
    required: false
  },
  olusturulmaTarihi: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Aktivite', AktiviteSchema);