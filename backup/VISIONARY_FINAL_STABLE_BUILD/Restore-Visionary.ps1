Write-Host "Restoring VISIONARY_FINAL_STABLE_BUILD..." -ForegroundColor Cyan

# The destination is the main project folder (two levels up from this script if running from within the folder, but we will define it robustly).
$source = $PSScriptRoot
$destination = Split-Path -Path (Split-Path -Path $source -Parent) -Parent

if ($destination -like "*New folder (2)*") {
    # Get all items except the restore scripts/notes themselves
    Get-ChildItem -Path $source | Where-Object { $_.Name -ne 'RESTORE_NOTES.md' -and $_.Name -ne 'Restore-Visionary.ps1' } | Copy-Item -Destination $destination -Recurse -Force
    Write-Host "RESTORE COMPLETE! The website is back to its stable master state." -ForegroundColor Green
} else {
    Write-Host "Error: Could not determine proper destination path to prevent accidental overwrites." -ForegroundColor Red
}
