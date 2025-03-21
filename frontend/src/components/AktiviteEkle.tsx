import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AktiviteEkle: React.FC = () => {
  const [aktiviteAdi, setAktiviteAdi] = useState('');
  const [tarih, setTarih] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [dosya, setDosya] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aktiviteAdi || !tarih || !aciklama) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('aktiviteAdi', aktiviteAdi);
      formData.append('tarih', tarih);
      formData.append('aciklama', aciklama);
      
      if (dosya) {
        formData.append('dosya', dosya);
      }

      await axios.post('http://localhost:5000/api/aktiviteler', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('Aktivite başarıyla eklendi.');
      
      // Form alanlarını temizle
      setAktiviteAdi('');
      setTarih('');
      setAciklama('');
      setDosya(null);
      
      // 2 saniye sonra ana sayfaya yönlendir
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Aktivite eklenirken hata:', err);
      setError('Aktivite eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDosya(e.target.files[0]);
    }
  };

  return (
    <div>
      <h2>Yeni Aktivite Ekle</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="aktiviteAdi">Aktivite Adı:</label>
          <input
            type="text"
            id="aktiviteAdi"
            className="form-control"
            value={aktiviteAdi}
            onChange={(e) => setAktiviteAdi(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="tarih">Tarih:</label>
          <input
            type="date"
            id="tarih"
            className="form-control"
            value={tarih}
            onChange={(e) => setTarih(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="aciklama">Açıklama:</label>
          <textarea
            id="aciklama"
            className="form-control"
            value={aciklama}
            onChange={(e) => setAciklama(e.target.value)}
            disabled={loading}
            rows={4}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dosya">Dosya (Opsiyonel):</label>
          <input
            type="file"
            id="dosya"
            className="form-control"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Ekleniyor...' : 'Aktivite Ekle'}
        </button>
      </form>
    </div>
  );
};

export default AktiviteEkle;