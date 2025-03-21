const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Aktivite = require('../models/AktiviteModel');

// Dosya yükleme için multer yapılandırması
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Tüm aktiviteleri getir
router.get('/aktiviteler', async (req, res) => {
  try {
    const aktiviteler = await Aktivite.find().sort({ tarih: -1 });
    res.json(aktiviteler);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tek bir aktivite getir
router.get('/aktiviteler/:id', async (req, res) => {
  try {
    const aktivite = await Aktivite.findById(req.params.id);
    if (!aktivite) {
      return res.status(404).json({ message: 'Aktivite bulunamadı' });
    }
    res.json(aktivite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Yeni aktivite ekle
router.post('/aktiviteler', upload.single('dosya'), async (req, res) => {
  try {
    const { aktiviteAdi, tarih, aciklama } = req.body;
    
    const yeniAktivite = new Aktivite({
      aktiviteAdi,
      tarih,
      aciklama,
      dosyaYolu: req.file ? `uploads/${req.file.filename}` : undefined
    });
    
    const kaydedilenAktivite = await yeniAktivite.save();
    res.status(201).json(kaydedilenAktivite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Aktivite güncelle
router.put('/aktiviteler/:id', upload.single('dosya'), async (req, res) => {
  try {
    const { aktiviteAdi, tarih, aciklama } = req.body;
    
    const aktivite = await Aktivite.findById(req.params.id);
    if (!aktivite) {
      return res.status(404).json({ message: 'Aktivite bulunamadı' });
    }
    
    // Eski dosyayı sil (eğer yeni dosya varsa)
    if (req.file && aktivite.dosyaYolu) {
      try {
        fs.unlinkSync(path.join(__dirname, '..', aktivite.dosyaYolu));
      } catch (unlinkErr) {
        console.error('Dosya silinirken hata:', unlinkErr);
      }
    }
    
    aktivite.aktiviteAdi = aktiviteAdi;
    aktivite.tarih = tarih;
    aktivite.aciklama = aciklama;
    
    if (req.file) {
      aktivite.dosyaYolu = `uploads/${req.file.filename}`;
    }
    
    const guncellenenAktivite = await aktivite.save();
    res.json(guncellenenAktivite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Aktivite sil
router.delete('/aktiviteler/:id', async (req, res) => {
  try {
    const aktivite = await Aktivite.findById(req.params.id);
    if (!aktivite) {
      return res.status(404).json({ message: 'Aktivite bulunamadı' });
    }
    
    // Dosyayı sil
    if (aktivite.dosyaYolu) {
      try {
        fs.unlinkSync(path.join(__dirname, '..', aktivite.dosyaYolu));
      } catch (unlinkErr) {
        console.error('Dosya silinirken hata:', unlinkErr);
      }
    }
    
    await aktivite.remove();
    res.json({ message: 'Aktivite silindi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;