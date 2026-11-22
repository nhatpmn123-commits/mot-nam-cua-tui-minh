@echo off
chcp 65001 >nul
title Sua web - Mot nam cua tui minh
cd /d "%~dp0"
"C:\Program Files\Git\cmd\git.exe" pull -q
python tools\edit_server.py
pause
