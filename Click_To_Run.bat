@echo off
title CivicPulse Local Server
echo ===================================================
echo   Starting CivicPulse Local Server...
echo ===================================================
echo.
start "" http://localhost:5173
npm run dev
pause
