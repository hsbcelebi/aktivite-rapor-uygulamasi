@echo off
chcp 65001 > nul
title Aktivite Uygulaması Başlatıcı

echo ===================================================
echo         AKTİVİTE UYGULAMASI BAŞLATICI
echo ===================================================
echo.
echo Bu script aktivite uygulamasının backend ve frontend servislerini başlatacaktır.
echo.

:: Node.js kontrolü
echo [BİLGİ] Node.js kontrolü yapılıyor...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] Node.js bulunamadı! Lütfen Node.js'i yükleyin ve PATH'e ekleyin.
    echo Node.js indirme sayfası: https://nodejs.org/
    pause
    exit /b 1
)

:: Klasörlerin kontrolü
echo [BİLGİ] Klasör yapısı kontrol ediliyor...

:: Geçerli dizini kaydet
set CURRENT_DIR=%CD%

:: Backend klasörünü kontrol et
if not exist "backend" (
    echo [HATA] Backend klasörü bulunamadı! Bu dosya proje kök dizinine konulmalıdır.
    echo Mevcut dizin: %CURRENT_DIR%
    pause
    exit /b 1
)

:: Frontend klasörünü kontrol et
if not exist "frontend" (
    echo [HATA] Frontend klasörü bulunamadı! Bu dosya proje kök dizinine konulmalıdır.
    echo Mevcut dizin: %CURRENT_DIR%
    pause
    exit /b 1
)

:: Backend kontrolleri
echo [BİLGİ] Backend gereksinimlerini kontrol ediliyor...
if not exist "backend\package.json" (
    echo [HATA] Backend klasöründe package.json bulunamadı!
    pause
    exit /b 1
)

if not exist "backend\server.js" (
    echo [HATA] Backend klasöründe server.js bulunamadı!
    pause
    exit /b 1
)

:: Frontend kontrolleri
echo [BİLGİ] Frontend gereksinimlerini kontrol ediliyor...
if not exist "frontend\package.json" (
    echo [HATA] Frontend klasöründe package.json bulunamadı!
    pause
    exit /b 1
)

echo.
echo [BİLGİ] Kontroller tamamlandı, servisler başlatılıyor...
echo.

:: Backend başlatma
echo [İŞLEM] Backend servisi başlatılıyor...
start cmd /k "title Aktivite Backend && cd /d "%CURRENT_DIR%\backend" && echo Backend dizini: %CURRENT_DIR%\backend && npm install && echo. && echo Backend başlatılıyor... && node server.js"

:: 5 saniye bekle (backend'in başlaması için)
echo [BİLGİ] Backend'in başlaması bekleniyor...
timeout /t 5 /nobreak > nul

:: Frontend başlatma
echo [İŞLEM] Frontend servisi başlatılıyor...
start cmd /k "title Aktivite Frontend && cd /d "%CURRENT_DIR%\frontend" && echo Frontend dizini: %CURRENT_DIR%\frontend && npm install && echo. && echo Frontend başlatılıyor... && npm start"

echo.
echo [BİLGİ] Her iki servis de başlatıldı!
echo.
echo Backend: http://localhost:5002
echo Frontend: http://localhost:3000
echo.
echo Tarayıcınızda http://localhost:3000 adresine gidebilirsiniz.
echo.
echo Bu pencereyi kapatabilirsiniz, servisler arka planda çalışmaya devam edecektir.
echo Servisleri durdurmak için açılan komut satırı pencerelerini kapatın.
echo.
echo ===================================================

pause