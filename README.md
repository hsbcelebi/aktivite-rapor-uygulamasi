# Aktivite Rapor Uygulaması

Bu uygulama, danışmanların aktivite raporlarını oluşturmak ve PDF formatında dışa aktarmak için kullanılır.

## Gereksinimler

### Backend için:
- Node.js (v14 veya daha yüksek)
- npm (Node.js paket yöneticisi)

### Frontend için:
- Node.js (v14 veya daha yüksek)
- npm (Node.js paket yöneticisi)
- React ve diğer paketler (package.json içinde belirtilmiştir)

## Kurulum ve Çalıştırma

### Otomatik Başlatma (Önerilen)

Uygulamayı hızlıca başlatmak için:

1. `start-aktivite.bat` dosyasını ana dizine koyun
2. `start-aktivite.bat` dosyasına çift tıklayın
3. Script, otomatik olarak hem backend hem de frontend servislerini başlatacaktır
4. Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı kullanabilirsiniz

### Manuel Başlatma

Servisleri ayrı ayrı manuel olarak başlatmak isterseniz:

#### Backend başlatma:
```bash
cd backend
npm install
node server.js
```

#### Frontend başlatma:
```bash
cd frontend
npm install
npm start
```

## Kullanım

1. Uygulamaya tarayıcınızdan `http://localhost:3000` adresinden erişin
2. Excel dosyanızı yükleyin
3. Rapor filtrelerini istediğiniz şekilde ayarlayın
4. "Rapor Oluştur" düğmesine tıklayın
5. Oluşturulan raporu görüntüleyin ve "PDF İndir" butonuyla PDF olarak indirin

## Özellikler

- Excel dosyasından aktivite verilerini okuma
- Danışman, müşteri ve proje bazlı filtreleme
- Tarih aralığı seçimi
- Aktivite ve fatura saatlerinin detaylı raporlanması
- İzin tablosu görüntüleme
- PDF raporu oluşturma ve indirme

## Sorun Giderme

1. **Backend başlamıyor ise:**
   - Node.js'in doğru şekilde kurulu olduğundan emin olun
   - Port 5002'nin boşta olduğunu kontrol edin

2. **Frontend başlamıyor ise:**
   - Node.js'in doğru şekilde kurulu olduğundan emin olun
   - npm paketlerinin doğru şekilde yüklendiğini kontrol edin
   - Port 3000'in boşta olduğunu kontrol edin

3. **Backend ve frontend başladı ancak uygulama çalışmıyor ise:**
   - Tarayıcı konsolunda hata mesajlarını kontrol edin
   - Backend konsolunda hata mesajlarını kontrol edin

## Not

Bu uygulama, hem backend hem de frontend servislerinin çalışmasını gerektirir. Birini kapatırsanız, uygulama düzgün çalışmayacaktır.