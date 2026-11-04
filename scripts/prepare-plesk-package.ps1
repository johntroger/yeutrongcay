<#
.SYNOPSIS
  Đóng gói toàn bộ mã nguồn production của Yêu Trồng Cây để triển khai lên Plesk Mắt Bão.
.DESCRIPTION
  1. Chạy typecheck và vite build
  2. Gom dist, api, uploads/.htaccess, public/.htaccess, migrations
  3. Tạo file nén yeutrongcay-production.zip sẵn sàng upload qua Plesk File Manager hoặc FTP
#>

$ErrorActionPreference = "Stop"

Write-Host "===> 1. Kiem tra kieu du lieu (TypeScript Typecheck)..." -ForegroundColor Cyan
npm run typecheck

Write-Host "===> 2. Bien dich bundle production (Vite Build)..." -ForegroundColor Cyan
npm run build

Write-Host "===> 3. Dong goi backend PHP & cau hinh bao mat..." -ForegroundColor Cyan
$deployDir = "dist"

# Tao cac thu muc can thiet
if (-not (Test-Path "$deployDir/api")) { New-Item -ItemType Directory -Path "$deployDir/api" -Force | Out-Null }
if (-not (Test-Path "$deployDir/uploads")) { New-Item -ItemType Directory -Path "$deployDir/uploads" -Force | Out-Null }
if (-not (Test-Path "$deployDir/migrations")) { New-Item -ItemType Directory -Path "$deployDir/migrations" -Force | Out-Null }

# Sao chep API PHP
Copy-Item -Path "api/*" -Destination "$deployDir/api" -Recurse -Force

# Sao chep cau hinh bao mat htaccess
if (Test-Path "uploads/.htaccess") {
    Copy-Item -Path "uploads/.htaccess" -Destination "$deployDir/uploads/.htaccess" -Force
}
if (Test-Path "public/.htaccess") {
    Copy-Item -Path "public/.htaccess" -Destination "$deployDir/.htaccess" -Force
}

# Sao chep database migrations
Copy-Item -Path "migrations/*" -Destination "$deployDir/migrations" -Recurse -Force

# Chặn thực thi PHP trực tiếp trong thư mục uploads
"<?php header('HTTP/1.0 403 Forbidden'); exit; ?>" | Set-Content -Path "$deployDir/uploads/index.php" -Encoding UTF8

# Ghi thong tin phien ban
$buildDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"yeutrongcay.com production build - $buildDate" | Set-Content -Path "$deployDir/build-info.txt" -Encoding UTF8

Write-Host "===> 4. Tao file nen POSIX zip yeutrongcay-production.zip chuan Linux..." -ForegroundColor Cyan
$zipPath = "yeutrongcay-production.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

# Dung tar tao file zip chuan POSIX slash (/) tuong thich 100% voi Linux /usr/bin/unzip tren Plesk
tar -a -c -f $zipPath -C $deployDir .

# Tự động dọn dẹp thư mục dist/ sau khi nén xong để tuân thủ Storage Cleanup rule
Remove-Item -Recurse -Force $deployDir

Write-Host "===> HOAN TAT DONG GOI!" -ForegroundColor Green
Write-Host "File san sang de upload len Plesk File Manager: $zipPath" -ForegroundColor Yellow
