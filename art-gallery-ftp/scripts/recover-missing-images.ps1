#requires -Version 5.1
<#
.SYNOPSIS
Recover the 36 original Unsplash photos documented in MISSING-IMAGES.md.
.DESCRIPTION
Run manually from a normal Windows terminal. Invoke-WebRequest downloads the
original URLs, including their w=1600&q=80 parameters. Node.js and the project's
installed sharp dependency are used ONLY for local image validation and the
original cache recipe: rotate(), resize to at most 1600px, WebP quality 84.
Only public/images/work/ is written. Valid existing images are never replaced.
This script does not install dependencies, rebuild out/, or modify the mapping.
.EXAMPLE
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\recover-missing-images.ps1
#>
[CmdletBinding()]
param(
    [ValidateRange(5, 600)]
    [int]$TimeoutSeconds = 60,
    [ValidateRange(1, 5)]
    [int]$MaxAttempts = 3
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$reportPath = Join-Path $projectRoot 'docs\static-verification\MISSING-IMAGES.md'
$manifestPath = Join-Path $projectRoot 'src\data\work-image-manifest.json'
$nodePath = (Get-Command node -CommandType Application -ErrorAction Stop).Source

# Send JavaScript through stdin to avoid PowerShell 5.1 native argument quoting
# issues. The helper performs no network requests and never edits the manifest.
$imageHelper = @'
const [mode, input, output] = process.argv.slice(2);
(async () => {
  const sharp = require('sharp');
  if (mode === 'prerequisite') {
    console.log(JSON.stringify({ valid: true }));
    return;
  }
  const options = { failOn: mode === 'inspect' ? 'error' : 'warning' };
  const metadata = await sharp(input, options).metadata();
  if (!metadata.width || !metadata.height) throw new Error('Image has no dimensions');
  // Fully decode pixels, rather than merely checking a header or MIME type.
  await sharp(input, options).stats();
  if (mode === 'convert') {
    await sharp(input, options).rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 84 }).toFile(output);
    const result = await sharp(output, options).metadata();
    if (result.format !== 'webp' || !result.width || !result.height)
      throw new Error('Converted file is not a valid WebP image');
    await sharp(output, options).stats();
    console.log(JSON.stringify({ valid: true, format: result.format,
      width: result.width, height: result.height }));
  } else if (mode === 'inspect') {
    console.log(JSON.stringify({ valid: true, format: metadata.format,
      width: metadata.width, height: metadata.height }));
  } else throw new Error('Unknown validation mode');
})().catch(error => {
  console.log(JSON.stringify({ valid: false, error: error.message }));
  process.exitCode = 1;
});
'@

function Invoke-ImageHelper {
    param([string]$Mode, [string]$InputPath = '', [string]$OutputPath = '')
    $helperOutput = @($imageHelper | & $nodePath --input-type=commonjs - $Mode $InputPath $OutputPath 2>&1)
    $helperExit = $LASTEXITCODE
    try {
        $result = ($helperOutput -join "`n") | ConvertFrom-Json
        if ($null -eq $result) { throw 'No image validation result.' }
    }
    catch {
        throw "Image validator failed (exit $helperExit): $($helperOutput -join ' ')"
    }
    return $result
}

$results = New-Object 'System.Collections.Generic.List[object]'
$originalTls = [Net.ServicePointManager]::SecurityProtocol
Push-Location -LiteralPath $projectRoot
try {
    $prerequisite = Invoke-ImageHelper -Mode 'prerequisite'
    if (-not $prerequisite.valid) {
        throw "Local validation requires the installed sharp dependency: $($prerequisite.error)"
    }

    $report = Get-Content -LiteralPath $reportPath -Raw -Encoding UTF8
    $manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $pattern = '(?m)^- Expected local file: \x60(?<destination>public/images/work/[a-f0-9]{16}\.webp)\x60\r?\n- Expected export file: [^\r\n]+\r?\n- Exact original: (?<url>https://images\.unsplash\.com/[^\r\n]+)'
    $reportEntries = [regex]::Matches($report, $pattern)
    if ($reportEntries.Count -ne 36 -or @($manifest.PSObject.Properties).Count -ne 36) {
        throw 'Expected exactly 36 report entries and manifest mappings. No downloads started.'
    }

    # Check every URL/destination before creating directories or downloading.
    $entries = New-Object 'System.Collections.Generic.List[object]'
    $seenUrls = New-Object 'System.Collections.Generic.HashSet[string]'
    $seenDestinations = New-Object 'System.Collections.Generic.HashSet[string]'
    $allowedDirectory = [System.IO.Path]::GetFullPath((Join-Path $projectRoot 'public\images\work'))
    foreach ($entry in $reportEntries) {
        $url = $entry.Groups['url'].Value
        $relativeDestination = $entry.Groups['destination'].Value
        $mapping = $manifest.PSObject.Properties[$url]
        if ($null -eq $mapping -or ('public' + [string]$mapping.Value) -cne $relativeDestination) {
            throw "Report and manifest disagree for $url. No downloads started."
        }
        if (-not $seenUrls.Add($url) -or -not $seenDestinations.Add($relativeDestination)) {
            throw 'Duplicate URL or destination. No downloads started.'
        }
        $destination = [System.IO.Path]::GetFullPath((Join-Path $projectRoot $relativeDestination))
        if ([System.IO.Path]::GetDirectoryName($destination) -cne $allowedDirectory) {
            throw "Destination outside public/images/work: $relativeDestination"
        }
        $entries.Add([pscustomobject]@{ Url = $url; Destination = $destination; RelativePath = $relativeDestination })
    }

    # Windows PowerShell 5.1 may otherwise negotiate an obsolete TLS version.
    [Net.ServicePointManager]::SecurityProtocol = $originalTls -bor [Net.SecurityProtocolType]::Tls12
    $headers = @{
        Accept = 'image/webp,image/avif,image/jpeg,image/png;q=0.9,*/*;q=0.1'
        'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PopArtImageRecovery/1.0'
    }
    $index = 0
    foreach ($entry in $entries) {
        $index++
        Write-Host "[$index/36] $($entry.RelativePath)"
        $downloadPath = $null
        $convertedPath = $null
        try {
            if (Test-Path -LiteralPath $entry.Destination) {
                $existing = Invoke-ImageHelper -Mode 'inspect' -InputPath $entry.Destination
                if ($existing.valid) {
                    if ($existing.format -ne 'webp') {
                        throw "Existing decodable image is $($existing.format), not WebP. Preserved without overwrite; inspect manually."
                    }
                    $results.Add([pscustomobject]@{ Status = 'Skipped'; File = $entry.RelativePath; Detail = 'Existing valid WebP preserved.' })
                    Write-Host '  SKIP: existing valid WebP.' -ForegroundColor Cyan
                    continue
                }
                Write-Host '  Existing file is invalid; replacement requires a complete valid download.'
            }

            [void][System.IO.Directory]::CreateDirectory($allowedDirectory)
            $temporaryName = '.recover-' + [guid]::NewGuid().ToString('N')
            $downloadPath = Join-Path $allowedDirectory ($temporaryName + '.download')
            $convertedPath = Join-Path $allowedDirectory ($temporaryName + '.webp')
            $lastFailure = ''
            $completed = $false
            for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
                try {
                    # HTTP failures and timeouts throw. HTML is never installed:
                    # full image decoding must succeed before the final move.
                    Invoke-WebRequest -Uri $entry.Url -Headers $headers -OutFile $downloadPath `
                        -UseBasicParsing -TimeoutSec $TimeoutSeconds -MaximumRedirection 5 -ErrorAction Stop
                    $converted = Invoke-ImageHelper -Mode 'convert' -InputPath $downloadPath -OutputPath $convertedPath
                    if (-not $converted.valid) { throw "Downloaded image failed decoding/conversion: $($converted.error)" }

                    # Recheck in case another run has recovered the destination.
                    if (Test-Path -LiteralPath $entry.Destination) {
                        $latest = Invoke-ImageHelper -Mode 'inspect' -InputPath $entry.Destination
                        if ($latest.valid) {
                            if ($latest.format -ne 'webp') { throw 'A valid non-WebP destination appeared; preserving it.' }
                            $results.Add([pscustomobject]@{ Status = 'Skipped'; File = $entry.RelativePath; Detail = 'Another valid WebP appeared; preserved.' })
                        }
                        else {
                            # Atomic replacement of an invalid file on the same volume.
                            [System.IO.File]::Replace($convertedPath, $entry.Destination, $null)
                            $results.Add([pscustomobject]@{ Status = 'Downloaded'; File = $entry.RelativePath; Detail = 'Invalid file replaced with decoded WebP.' })
                        }
                    }
                    else {
                        # No overwrite if a concurrent process creates the destination.
                        [System.IO.File]::Move($convertedPath, $entry.Destination)
                        $results.Add([pscustomobject]@{ Status = 'Downloaded'; File = $entry.RelativePath; Detail = "$($converted.width)x$($converted.height) WebP, quality 84." })
                    }
                    Write-Host '  OK: valid WebP available at the exact destination.' -ForegroundColor Green
                    $completed = $true
                    break
                }
                catch {
                    $lastFailure = $_.Exception.Message
                    Write-Warning "Attempt $attempt/$MaxAttempts failed for $($entry.RelativePath): $lastFailure"
                    if ($attempt -lt $MaxAttempts) { Start-Sleep -Seconds ([Math]::Min(2 * $attempt, 6)) }
                }
            }
            if (-not $completed) { throw $lastFailure }
        }
        catch {
            $results.Add([pscustomobject]@{ Status = 'Failed'; File = $entry.RelativePath; Detail = $_.Exception.Message })
            Write-Warning "FAILED: $($entry.Url) -> $($entry.RelativePath): $($_.Exception.Message)"
        }
        finally {
            # Remove only this iteration's uniquely named temporary files.
            foreach ($temporaryPath in @($downloadPath, $convertedPath)) {
                if ($temporaryPath -and (Test-Path -LiteralPath $temporaryPath)) {
                    Remove-Item -LiteralPath $temporaryPath -Force -ErrorAction SilentlyContinue
                }
            }
        }
    }
}
finally {
    [Net.ServicePointManager]::SecurityProtocol = $originalTls
    Pop-Location
}

$downloaded = @($results | Where-Object Status -eq 'Downloaded').Count
$skipped = @($results | Where-Object Status -eq 'Skipped').Count
$failures = @($results | Where-Object Status -eq 'Failed')
Write-Host ''
Write-Host 'Recovery summary'
Write-Host "  Downloaded/recovered: $downloaded"
Write-Host "  Existing valid images preserved: $skipped"
Write-Host "  Failed: $($failures.Count)"
if ($failures.Count -gt 0) {
    $failures | Format-List File, Detail | Out-Host
    Write-Host 'No substitutes were installed. Re-run to retry failed downloads.'
    exit 1
}
Write-Host 'All 36 mapped WebP images are locally available. Rebuild out/ manually with: npm run build'
exit 0
