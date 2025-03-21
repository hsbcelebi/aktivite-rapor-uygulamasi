import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AktiviteListesi from './components/AktiviteListesi';
import AktiviteEkle from './components/AktiviteEkle';
import AktiviteDuzenle from './components/AktiviteDuzenle';
import RaporOlustur from './components/RaporOlustur';

function App() {
  return (
    <div className="App">
      <nav className="nav-bar">
        <Link to="/">Ana Sayfa</Link>
        <Link to="/ekle">Aktivite Ekle</Link>
        <Link to="/rapor">Rapor Oluştur</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<AktiviteListesi />} />
          <Route path="/ekle" element={<AktiviteEkle />} />
          <Route path="/duzenle/:id" element={<AktiviteDuzenle />} />
          <Route path="/rapor" element={<RaporOlustur />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;