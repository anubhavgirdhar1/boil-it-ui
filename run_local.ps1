# Force UTF-8 output
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Clear-Host

Write-Host @"
========================================
   BOIL IT
   Forge once. Reuse forever.
========================================
"@

Write-Host ""
Write-Host "Starting Boil It (Local Mode)"
Write-Host ""

# -------- Backend --------
Write-Host "Starting backend..."
Start-Process powershell `
  -ArgumentList "-NoExit -Command `"cd backend/app; uvicorn main:app --host 0.0.0.0 --port 3000 --reload`"" `
  -WindowStyle Normal

# -------- Frontend --------
Write-Host "Starting frontend..."
Start-Process powershell `
  -ArgumentList "-NoExit -Command `"cd frontend; if (!(Test-Path node_modules)) { npm install }; npm run dev`"" `
  -WindowStyle Normal

Write-Host ""
Write-Host "Boil It is running:"
Write-Host "Frontend -> http://localhost:5173"
Write-Host "Backend  -> http://localhost:3000"
Write-Host ""
Write-Host "Close the opened terminals to stop Boil It"
