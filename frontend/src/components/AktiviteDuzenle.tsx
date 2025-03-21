import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Aktivite {
  _id: string;
  aktiviteAdi: string;
  tarih: string;
  aciklama: string;
  dosyaYolu?: string;
}

const AktiviteDuzenle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [aktiviteAdi, setAktiviteAdi] = useState('');
  const [tarih, setTarih] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [dosya, setDosya] = useState<File | null>(null);
  const [mevcutDosya, setMevcutDosya] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchAktivite();
  }, [id]);

  const fetchAktivite = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Aktivite>(`http://localhost:5000/api/aktiviteler/${id}`);
      const aktivite = response.data;
      
      setAktiviteAdi(aktivite.aktiviteAdi);
      // Tarihi YYYY-MM-DD formatına çevir
      setTarih(new Date(aktivite.tarih).toISOString().split('T')[0]);
      setAciklama(aktivite.aciklama);
      
      if (aktivite.dosyaYolu) {
        setMevcutDosya(aktivite.dosyaYolu);
      }
      
      setError(null);
    } catch (err) {
      console.error('Aktivite yüklenirken hata:', err);
      setError('Aktivite yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aktiviteAdi || !tarih || !aciklama) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setUpdating(true);
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

      await axios.put(`http://localhost:5000/api/aktiviteler/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('Aktivite başarıyla güncellendi.');
      
      // 2 saniye sonra ana sayfaya yönlendir
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Aktivite güncellenirken hata:', err);
      setError('Aktivite güncellenirken bir hata oluştu.');
    } finally {
      setUpdating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDosya(e.target.files[0]);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error && !aktiviteAdi) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2>Aktivite Düzenle</h2>
      
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
            disabled={updating}
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
            disabled={updating}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="aciklama">Açıklama:</label>
          <textarea
            id="aciklama"
            className="form-control"
            value={aciklama}
            onChange={(e) => setAciklama(e.target.value)}
            disabled={updating}
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
            disabled={updating}
          />
          {mevcutDosya && !dosya && (
            <div style={{ marginTop: '5px' }}>
              <small>
                Mevcut dosya: 
                <a 
                  href={`http://localhost:5000/${mevcutDosya}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ marginLeft: '5px' }}
                >
                  Dosyayı Görüntüle
                </a>
              </small>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={updating}
        >
          {updating ? 'Güncelleniyor...' : 'Güncelle'}
        </button>
      </form>
    </div>
  );
};

export default AktiviteDuzenle;