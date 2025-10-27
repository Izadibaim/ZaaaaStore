@echo off
title 🚀 Push ZaaaaStore ke GitHub
color 0E

:: === Ganti path sesuai lokasi project kamu ===
cd /d "D:\Tugas Kuliah\TUGAS SMST 5\Pak Fadli_SEO, SEM\ZaaaaStore"

echo ==============================================
echo  🟡 Menyiapkan ZaaaaStore untuk diupload...
echo ==============================================
echo.

:: === Update tanggal di sitemap.xml otomatis ===
echo Mengupdate tanggal sitemap.xml...
powershell -Command "(Get-Content sitemap.xml) -replace '<lastmod>.*</lastmod>', ('<lastmod>' + (Get-Date -Format 'yyyy-MM-dd') + '</lastmod>') | Set-Content sitemap.xml"

:: === Tambahkan semua perubahan ===
git add .

:: === Commit dengan tanggal otomatis ===
for /f %%a in ('powershell -Command "Get-Date -Format yyyy-MM-dd_HH-mm"') do set DATETIME=%%a
git commit -m "Update otomatis (%DATETIME%)"

:: === Push ke GitHub ===
echo.
echo 🔄 Mengupload ke GitHub...
git push origin main

:: === Selesai ===
echo.
echo ==============================================
echo  ✅ ZaaaaStore berhasil diupload ke GitHub!
echo  🌍 Cek di: https://izadibaim.github.io/ZaaaaStore/
echo ==============================================
pause
