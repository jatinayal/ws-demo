param (
    [switch]$Reset,
    [switch]$Force
)

$apiUrl = "http://localhost:3000/api/seed"

# We fetch the PAYLOAD_SECRET from the .env file
$envFilePath = Join-Path $PSScriptRoot ".env"
$secret = "fallback-secret"

if (Test-Path $envFilePath) {
    $envContent = Get-Content $envFilePath
    foreach ($line in $envContent) {
        if ($line -match "^PAYLOAD_SECRET=(.*)$") {
            $secret = $matches[1] -replace '^"|"$',''
            break
        }
    }
}

$body = @{
    reset = $Reset
    force = $Force
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $secret"
    "Content-Type" = "application/json"
}

Write-Host "Triggering seed API at $apiUrl..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Headers $headers -Body $body -ErrorAction Stop
    Write-Host "Success: $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "Error occurred during seeding: $_" -ForegroundColor Red
}
