$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$dataDir = Join-Path $root 'data'

$names = @('items', 'monsters', 'events', 'locations', 'recipes')
$parts = foreach ($name in $names) {
  $raw = [System.IO.File]::ReadAllText((Join-Path $dataDir "$name.json"), [System.Text.Encoding]::UTF8).Trim()
  "  `"$name`": $raw"
}

$output = @(
  '// ARQUIVO GERADO por tools/build-data.ps1 — não editar à mão.'
  'window.GAME_DATA = {'
  ($parts -join ",`n")
  '};'
  ''
) -join "`n"

$outPath = Join-Path $dataDir 'bundle.js'
[System.IO.File]::WriteAllText($outPath, $output, (New-Object System.Text.UTF8Encoding $false))
Write-Host "Gerado: $outPath"
