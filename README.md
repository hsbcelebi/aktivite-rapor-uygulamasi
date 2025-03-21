# Aktivite Rapor Uygulaması

Bu uygulama, aktivitelerinizi kaydetmenize ve bu aktivitelerden rapor oluşturmanıza olanak sağlayan bir web uygulamasıdır.

## Özellikler

- Aktivite ekleme, düzenleme ve silme
- Aktivitelerle ilgili dosyaları yükleme ve indirme
- Belirli tarih aralığındaki aktivitelerden PDF raporu oluşturma
- Mobil uyumlu arayüz

## Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB (v4 veya üzeri)
- npm veya yarn

### Backend Kurulumu

```bash
# backend dizinine geçin
cd backend

# Bağımlılıkları yükleyin
npm install

# uploads klasörünü oluşturun (dosya yüklemeleri için)
mkdir -p uploads

# Sunucuyu başlatın
npm start
```

### Frontend Kurulumu

```bash
# frontend dizinine geçin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start
```

## Kullanım

Uygulamayı başlattıktan sonra tarayıcınızdan `http://localhost:3000` adresine giderek kullanmaya başlayabilirsiniz.

### Aktivite Ekleme

1. Ana menüden "Aktivite Ekle" seçeneğine tıklayın
2. Gerekli bilgileri doldurun
3. İsterseniz bir dosya ekleyin
4. "Aktivite Ekle" butonuna tıklayın

### Rapor Oluşturma

1. Ana menüden "Rapor Oluştur" seçeneğine tıklayın
2. Başlangıç ve bitiş tarihlerini seçin
3. "PDF Olarak İndir" butonuna tıklayın

## Başlatma Betikleri

### Windows için

```batch
@echo off
start "MongoDB" /min "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:/data/db"
cd backend
start "Backend" cmd /k "npm start"
cd ../frontend
start "Frontend" cmd /k "npm start"
```

### PowerShell için

```powershell
# MongoDB'yi başlat
Start-Process -WindowStyle Minimized -FilePath "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" -ArgumentList "--dbpath=C:/data/db"

# Backend'i başlat
Start-Process -WorkingDirectory "./backend" -FilePath "cmd" -ArgumentList "/k npm start"

# Frontend'i başlat
Start-Process -WorkingDirectory "./frontend" -FilePath "cmd" -ArgumentList "/k npm start"
```

## Teknolojiler

### Backend
- Node.js
- Express.js
- MongoDB ve Mongoose
- Multer (dosya yükleme)

### Frontend
- React
- TypeScript
- Axios
- jsPDF (PDF oluşturma)

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.