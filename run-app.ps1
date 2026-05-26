# Start MongoDB in a new window
Write-Host "Starting MongoDB..." -ForegroundColor Green
Start-Process powershell -ArgumentList '-NoExit', '-Command', '& "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath C:\USER-MANAGEMENT-APP\mongodb-data --port 27017'

# Start Spring Boot Backend in a new window
Write-Host "Starting Java Spring Boot Backend..." -ForegroundColor Green

$backendCmd = @'
$env:JAVA_HOME = "C:\USER-MANAGEMENT-APP\jdk17-extracted\jdk-17.0.11+9"
$env:Path = "$env:JAVA_HOME\bin;C:\USER-MANAGEMENT-APP\maven-extracted\apache-maven-3.9.6\bin;" + $env:Path
cd C:\USER-MANAGEMENT-APP\backend-java
mvn spring-boot:run
'@
Start-Process powershell -ArgumentList '-NoExit', '-Command', $backendCmd

# Start React Frontend in a new window
Write-Host "Starting React Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd C:\USER-MANAGEMENT-APP\frontend; npm run dev'

Write-Host "All services starting! Check the new windows for logs." -ForegroundColor Cyan
