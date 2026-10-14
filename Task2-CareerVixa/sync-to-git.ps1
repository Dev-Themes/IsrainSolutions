# Sync CareerVixa working files to the git repository Task2-CareerVixa folder
$Source = "D:\Muhammad Shariq\Internship\Israin Solutions - Ongoing\ai-powered-blog"
$Destination = "D:\Muhammad Shariq\Internship\Israin Solutions\Task2-CareerVixa"
$RepoRoot = "D:\Muhammad Shariq\Internship\Israin Solutions"

Write-Host "Syncing files from $Source to $Destination..." -ForegroundColor Cyan

robocopy $Source $Destination /E /XD node_modules .next venv scratch .agents .specify /XF .env *.log

Write-Host "Sync complete!" -ForegroundColor Green
Write-Host "Checking git status..." -ForegroundColor Cyan
git -C $RepoRoot status
