# Aktivite Rapor Uygulaması başlatma betiği
Write-Host "Aktivite Rapor Uygulaması başlatılıyor..." -ForegroundColor Green
Write-Host ""

# MongoDB'yi başlat - MongoDB kurulu olmadığında yorum satırını kaldırın
# Write-Host "MongoDB başlatılıyor..." -ForegroundColor Cyan
# Start-Process -WindowStyle Minimized -FilePath "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" -ArgumentList "--dbpath=C:/data/db"
# Write-Host "MongoDB başlatıldı..." -ForegroundColor Green
# Write-Host ""

# Backend'i başlat
Write-Host "Backend servisi başlatılıyor..." -ForegroundColor Cyan
Start-Process -WorkingDirectory "./backend" -FilePath "cmd" -ArgumentList "/k npm start"
Write-Host "Backend servisi başlatıldı..." -ForegroundColor Green
Write-Host ""

# Frontend'i başlat
Write-Host "Frontend servisi başlatılıyor..." -ForegroundColor Cyan
Start-Process -WorkingDirectory "./frontend" -FilePath "cmd" -ArgumentList "/k npm start"
Write-Host "Frontend servisi başlatıldı..." -ForegroundColor Green
Write-Host ""

Write-Host "Tüm servisler başlatıldı!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Yellow

# Tarayıcıyı 3 saniye sonra aç
Start-Sleep -Seconds 3
Start-Process "http://localhost:3000"

Write-Host ""