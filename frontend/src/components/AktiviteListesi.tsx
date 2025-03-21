import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Aktivite {
  _id: string;
  aktiviteAdi: string;
  tarih: string;
  aciklama: string;
  dosyaYolu?: string;
}

const AktiviteListesi: React.FC = () => {
  const [aktiviteler, setAktiviteler] = useState<Aktivite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAktiviteler();
  }, []);

  const fetchAktiviteler = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Aktivite[]>('http://localhost:5000/api/aktiviteler');
      setAktiviteler(response.data);
      setError(null);
    } catch (err) {
      setError('Aktiviteler yüklenirken bir hata oluştu.');
      console.error('Aktiviteler yüklenirken hata:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu aktiviteyi silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete(`http://localhost:5000/api/aktiviteler/${id}`);
        setAktiviteler(aktiviteler.filter(aktivite => aktivite._id !== id));
      } catch (err) {
        console.error('Aktivite silinirken hata:', err);
        setError('Aktivite silinirken bir hata oluştu.');
      }
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2>Aktivite Listesi</h2>
      {aktiviteler.length === 0 ? (
        <p>Henüz hiç aktivite eklenmemiş.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Aktivite Adı</th>
              <th>Tarih</th>
              <th>Açıklama</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {aktiviteler.map((aktivite) => (
              <tr key={aktivite._id}>
                <td>{aktivite.aktiviteAdi}</td>
                <td>{new Date(aktivite.tarih).toLocaleDateString('tr-TR')}</td>
                <td>{aktivite.aciklama}</td>
                <td>
                  <Link to={`/duzenle/${aktivite._id}`} className="btn btn-primary" style={{ marginRight: '5px' }}>
                    Düzenle
                  </Link>
                  <button onClick={() => handleDelete(aktivite._id)} className="btn btn-danger">
                    Sil
                  </button>
                  {aktivite.dosyaYolu && (
                    <a 
                      href={`http://localhost:5000/${aktivite.dosyaYolu}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-success"
                      style={{ marginLeft: '5px' }}
                    >
                      Dosya
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AktiviteListesi;