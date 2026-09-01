@echo off
echo Starting Datada Server...
start "Datada Server" cmd /k "cd server && npm run dev"

echo Starting Datada Client...
start "Datada Client" cmd /k "cd client && npm run dev"

echo Application is starting...
echo Frontend will be at: http://localhost:5173
echo Backend will be at: http://localhost:5000
pause
