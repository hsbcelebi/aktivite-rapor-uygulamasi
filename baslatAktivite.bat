@echo off
echo Aktivite Rapor Uygulaması başlatılıyor...
echo.

:: MongoDB başlatma - MongoDB kurulu olmadığında yorum satırını kaldırın
:: start "MongoDB" /min "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:/data/db"
:: echo MongoDB başlatıldı...
:: echo.

echo Backend servisi başlatılıyor...
cd backend
start "Backend" cmd /k "npm start"
echo.

echo Frontend servisi başlatılıyor...
cd ../frontend
start "Frontend" cmd /k "npm start"
echo.

echo Tüm servisler başlatıldı!
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000

:: Tarayıcıyı 3 saniye sonra aç
timeout /t 3 /nobreak > nul
start http://localhost:3000

echo.