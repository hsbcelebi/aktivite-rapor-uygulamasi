import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Aktivite {
  _id: string;
  aktiviteAdi: string;
  tarih: string;
  aciklama: string;
  dosyaYolu?: string;
}

interface FiltreSecenekleri {
  baslangicTarihi: string;
  bitisTarihi: string;
}

const RaporOlustur: React.FC = () => {
  const [aktiviteler, setAktiviteler] = useState<Aktivite[]>([]);
  const [filtrelenmisAktiviteler, setFiltrelenmisAktiviteler] = useState<Aktivite[]>([]);
  const [filtre, setFiltre] = useState<FiltreSecenekleri>({
    baslangicTarihi: '',
    bitisTarihi: ''
  });
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAktiviteler();
  }, []);

  useEffect(() => {
    filtreUygula();
  }, [aktiviteler, filtre]);

  const fetchAktiviteler = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Aktivite[]>('http://localhost:5000/api/aktiviteler');
      setAktiviteler(response.data);
      setFiltrelenmisAktiviteler(response.data);
      setError(null);
    } catch (err) {
      console.error('Aktiviteler yüklenirken hata:', err);
      setError('Aktiviteler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const filtreUygula = () => {
    let sonuc = [...aktiviteler];
    
    if (filtre.baslangicTarihi) {
      sonuc = sonuc.filter(aktivite => 
        new Date(aktivite.tarih) >= new Date(filtre.baslangicTarihi)
      );
    }
    
    if (filtre.bitisTarihi) {
      sonuc = sonuc.filter(aktivite => 
        new Date(aktivite.tarih) <= new Date(filtre.bitisTarihi)
      );
    }
    
    setFiltrelenmisAktiviteler(sonuc);
  };

  const handleFiltreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltre(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePDFIndir = () => {
    // jsPDF nesnesi oluştur - A4 boyutunda
    const doc = new jsPDF();
    
    // Başlık ekle
    doc.setFontSize(18);
    doc.text('Aktivite Raporu', 14, 20);
    
    // Filtreleme bilgilerini ekle
    doc.setFontSize(12);
    if (filtre.baslangicTarihi) {
      doc.text(`Başlangıç Tarihi: ${new Date(filtre.baslangicTarihi).toLocaleDateString('tr-TR')}`, 14, 30);
    }
    if (filtre.bitisTarihi) {
      doc.text(`Bitiş Tarihi: ${new Date(filtre.bitisTarihi).toLocaleDateString('tr-TR')}`, 14, 40);
    }
    
    // Tarih ve saat ekle
    const now = new Date();
    doc.setFontSize(10);
    doc.text(`Oluşturulma Tarihi: ${now.toLocaleDateString('tr-TR')} ${now.toLocaleTimeString('tr-TR')}`, 14, 50);
    
    // Tabloyu oluştur
    // @ts-ignore: Properly import and augment jsPDF types
    doc.autoTable({
      startY: 60,
      head: [['No', 'Aktivite Adı', 'Tarih', 'Açıklama']],
      body: filtrelenmisAktiviteler.map((aktivite, index) => [
        index + 1,
        aktivite.aktiviteAdi,
        new Date(aktivite.tarih).toLocaleDateString('tr-TR'),
        aktivite.aciklama
      ]),
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202] },
      styles: { overflow: 'linebreak', cellWidth: 'auto' },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 40 },
        2: { cellWidth: 25 },
        3: { cellWidth: 'auto' }
      }
    });
    
    // Alt bilgi ekle
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Sayfa ${i} / ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    }
    
    // PDF'i indir
    doc.save(`aktivite-raporu-${now.toISOString().split('T')[0]}.pdf`);
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2>Rapor Oluştur</h2>
      
      <div className="form-group">
        <div className="row" style={{ display: 'flex', marginBottom: '20px' }}>
          <div className="col" style={{ flex: 1, marginRight: '10px' }}>
            <label htmlFor="baslangicTarihi">Başlangıç Tarihi:</label>
            <input
              type="date"
              id="baslangicTarihi"
              name="baslangicTarihi"
              className="form-control"
              value={filtre.baslangicTarihi}
              onChange={handleFiltreChange}
            />
          </div>
          
          <div className="col" style={{ flex: 1, marginLeft: '10px' }}>
            <label htmlFor="bitisTarihi">Bitiş Tarihi:</label>
            <input
              type="date"
              id="bitisTarihi"
              name="bitisTarihi"
              className="form-control"
              value={filtre.bitisTarihi}
              onChange={handleFiltreChange}
            />
          </div>
        </div>
      </div>
      
      <button 
        className="btn btn-primary" 
        onClick={handlePDFIndir}
        disabled={filtrelenmisAktiviteler.length === 0}
      >
        PDF Olarak İndir
      </button>
      
      <hr />
      
      <h3>Önizleme</h3>
      
      {filtrelenmisAktiviteler.length === 0 ? (
        <p>Seçilen tarih aralığında aktivite bulunamadı.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Aktivite Adı</th>
              <th>Tarih</th>
              <th>Açıklama</th>
            </tr>
          </thead>
          <tbody>
            {filtrelenmisAktiviteler.map((aktivite, index) => (
              <tr key={aktivite._id}>
                <td>{index + 1}</td>
                <td>{aktivite.aktiviteAdi}</td>
                <td>{new Date(aktivite.tarih).toLocaleDateString('tr-TR')}</td>
                <td>{aktivite.aciklama}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RaporOlustur;