<#
.SYNOPSIS
  Tự động biên dịch và đồng bộ trực tiếp lên nhánh 'production' trên GitHub để Plesk Git Extension cập nhật ngay lập tức.
#>
$ErrorActionPreference = "Stop"

Write-Host "===> 1. Kiem tra kieu du lieu & Unit Tests..." -ForegroundColor Cyan
npm run typecheck
npm test

Write-Host "===> 2. Bien dich bundle production (Vite Build)..." -ForegroundColor Cyan
npm run build

Write-Host "===> 3. Dong goi backend PHP & cau hinh bao mat vao dist/..." -ForegroundColor Cyan
$deployDir = "dist"
if (-not (Test-Path "$deployDir/api")) { New-Item -ItemType Directory -Path "$deployDir/api" -Force | Out-Null }
if (-not (Test-Path "$deployDir/uploads")) { New-Item -ItemType Directory -Path "$deployDir/uploads" -Force | Out-Null }
if (-not (Test-Path "$deployDir/migrations")) { New-Item -ItemType Directory -Path "$deployDir/migrations" -Force | Out-Null }

Copy-Item -Path "api/*" -Destination "$deployDir/api" -Recurse -Force
if (Test-Path "uploads/.htaccess") { Copy-Item -Path "uploads/.htaccess" -Destination "$deployDir/uploads/.htaccess" -Force }
if (Test-Path "public/.htaccess") { Copy-Item -Path "public/.htaccess" -Destination "$deployDir/.htaccess" -Force }
Copy-Item -Path "migrations/*" -Destination "$deployDir/migrations" -Recurse -Force

"<?php header('HTTP/1.0 403 Forbidden'); exit; ?>" | Set-Content -Path "$deployDir/uploads/index.php" -Encoding UTF8
$buildDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"yeutrongcay.com production build - $buildDate" | Set-Content -Path "$deployDir/build-info.txt" -Encoding UTF8

Write-Host "===> 4. Tao goi ZIP du phong yeutrongcay-production.zip..." -ForegroundColor Cyan
if (Test-Path "yeutrongcay-production.zip") { Remove-Item "yeutrongcay-production.zip" -Force }
tar -a -c -f "yeutrongcay-production.zip" -C $deployDir .

Write-Host "===> 5. Day truc tiep sang nhanh 'production' de Plesk Git tu dong cap nhat..." -ForegroundColor Cyan
Push-Location $deployDir
git init -b production
git config user.name "Yeu Trong Cay Deployer"
git config user.email "deploy@yeutrongcay.com"
git add -A
git commit -m "deploy: sync production build to Plesk ($buildDate)"
git remote add origin https://github.com/johntroger/yeutrongcay.git
git push -f origin production
Pop-Location

# Dọn dẹp dist/ theo quy tắc Storage Cleanup
Remove-Item -Recurse -Force $deployDir

Write-Host "===> HOAN TAT DONG BO PLESK QUA GIT!" -ForegroundColor Green
